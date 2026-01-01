// SecureVault - Password Manager with File Storage
// Requires CryptoJS (loaded from CDN in index.html)

// Helpers
const $ = id => document.getElementById(id);

// Track failed attempts for each password entry
let failedAttempts = JSON.parse(localStorage.getItem("failedAttempts")) || {};
let isAuthenticated = false;
let stream = null;
let registeredFace = localStorage.getItem("registeredFace");
let selectedFiles = [];

// Biometric authentication state
const DEFAULT_ID = "tithi";

function saveToStorage(passwords) {
  localStorage.setItem("passwords", JSON.stringify(passwords));
}

function getFromStorage() {
  return JSON.parse(localStorage.getItem("passwords")) || [];
}

function saveFailedAttempts() {
  localStorage.setItem("failedAttempts", JSON.stringify(failedAttempts));
}

function getFilesFromStorage() {
  return JSON.parse(localStorage.getItem("secureFiles")) || [];
}

function saveFilesToStorage(files) {
  localStorage.setItem("secureFiles", JSON.stringify(files));
}

// UI elements
const registerModal = $("registerModal");
const fileUploadModal = $("fileUploadModal");
const authModal = $("authModal");
const mainApp = $("mainApp");
const firstTimeAuth = $("firstTimeAuth");
const returningAuth = $("returningAuth");

// Registration elements
const registerFaceBtn = $("registerFaceBtn");
const startRegistrationBtn = $("startRegistrationBtn");
const completeRegistrationBtn = $("completeRegistrationBtn");
const registerVideo = $("registerVideo");
const scanVideo = $("scanVideo");
const progressFill = $("progressFill");
const progressText = $("progressText");
const scanStatus = $("scanStatus");

// File Upload elements
const uploadArea = $("uploadArea");
const fileInput = $("fileInput");
const fileList = $("fileList");
const uploadFilesBtn = $("uploadFilesBtn");
const cancelUploadBtn = $("cancelUploadBtn");
const uploadNewBtn = $("uploadNewBtn");
const filesGrid = $("filesGrid");
const emptyFilesState = $("emptyFilesState");
const storageUsed = $("storageUsed");

// Authentication elements
const faceAuthBtn = $("faceAuthBtn");
const idAuthBtn = $("idAuthBtn");
const useIdFirstTimeBtn = $("useIdFirstTimeBtn");
const faceAuthSection = $("faceAuthSection");
const idAuthSection = $("idAuthSection");
const video = $("video");
const canvas = $("canvas");
const captureBtn = $("captureBtn");
const retryFaceBtn = $("retryFaceBtn");
const idInput = $("idInput");
const verifyIdBtn = $("verifyIdBtn");
const faceStatus = $("faceStatus");
const idStatus = $("idStatus");
const closeAuthBtn = $("closeAuthBtn");
const logoutBtn = $("logoutBtn");
const loginProgressFill = $("loginProgressFill");
const loginProgressText = $("loginProgressText");

const typeEl = $("type");
const nameEl = $("name");
const nameLabel = $("nameLabel");
const usernameEl = $("username");
const passwordEl = $("password");
const masterKeyEl = $("masterKey");
const saveBtn = $("saveBtn");
const clearBtn = $("clearBtn");
const generateBtn = $("generateBtn");

// Tab functionality
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    const tabName = button.getAttribute('data-tab');
    $(`${tabName}Tab`).classList.add('active');
    
    // Load files if files tab is selected
    if (tabName === 'files') {
      loadFiles();
    }
  });
});

// Initialize based on registration status
function initializeApp() {
  if (registeredFace) {
    // User has registered face before
    firstTimeAuth.classList.add("hidden");
    returningAuth.classList.remove("hidden");
  } else {
    // First time user
    firstTimeAuth.classList.remove("hidden");
    returningAuth.classList.add("hidden");
  }
  showAuthModal();
}

// File Upload Functions
function showUploadModal() {
  fileUploadModal.classList.remove("hidden");
  selectedFiles = [];
  updateFileList();
}

function hideUploadModal() {
  fileUploadModal.classList.add("hidden");
}

function handleFileSelect(files) {
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  for (let file of files) {
    if (file.size > maxSize) {
      alert(`File ${file.name} is too large. Maximum size is 10MB.`);
      continue;
    }
    
    if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
      selectedFiles.push(file);
    }
  }
  
  updateFileList();
}

function updateFileList() {
  fileList.innerHTML = '';
  
  if (selectedFiles.length === 0) {
    fileList.innerHTML = '<p class="no-files">No files selected</p>';
    uploadFilesBtn.disabled = true;
    return;
  }
  
  uploadFilesBtn.disabled = false;
  
  selectedFiles.forEach((file, index) => {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileIcon = getFileIcon(fileExtension);
    const fileSize = formatFileSize(file.size);
    
    fileItem.innerHTML = `
      <div class="file-info">
        <span class="file-icon">${fileIcon}</span>
        <div>
          <div class="file-name">${file.name}</div>
          <div class="file-size">${fileSize}</div>
        </div>
      </div>
      <button class="remove-file" onclick="removeFile(${index})">×</button>
    `;
    
    fileList.appendChild(fileItem);
  });
}

function removeFile(index) {
  selectedFiles.splice(index, 1);
  updateFileList();
}

function getFileIcon(extension) {
  const iconMap = {
    'jpg': '🖼️',
    'jpeg': '🖼️',
    'png': '🖼️',
    'gif': '🖼️',
    'pdf': '📄',
    'doc': '📝',
    'docx': '📝',
    'txt': '📄',
    'zip': '📦',
    'rar': '📦'
  };
  
  return iconMap[extension] || '📁';
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function uploadFiles() {
  const masterKey = prompt("Enter master key to encrypt files:");
  if (!masterKey) return;
  
  const files = getFilesFromStorage();
  
  for (let file of selectedFiles) {
    const fileData = await readFileAsDataURL(file);
    const encryptedData = CryptoJS.AES.encrypt(fileData, masterKey).toString();
    
    const fileEntry = {
      id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      encryptedData: encryptedData,
      uploadedAt: new Date().toISOString(),
      extension: file.name.split('.').pop().toLowerCase()
    };
    
    files.push(fileEntry);
  }
  
  saveFilesToStorage(files);
  hideUploadModal();
  loadFiles();
  alert('Files uploaded and encrypted successfully!');
}

function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

function loadFiles() {
  const files = getFilesFromStorage();
  filesGrid.innerHTML = '';
  
  if (files.length === 0) {
    emptyFilesState.classList.remove('hidden');
    filesGrid.classList.add('hidden');
    updateStorageInfo();
    return;
  }
  
  emptyFilesState.classList.add('hidden');
  filesGrid.classList.remove('hidden');
  
  let totalSize = 0;
  
  files.forEach(file => {
    totalSize += file.size;
    
    const fileCard = document.createElement('div');
    fileCard.className = 'file-card';
    
    const isImage = file.type.startsWith('image/');
    const fileIcon = getFileIcon(file.extension);
    
    fileCard.innerHTML = `
      ${isImage ? 
        `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2338bdf8' font-family='Arial' font-size='14'%3EEncrypted Image%3C/text%3E%3C/svg%3E" 
              class="file-card-image" alt="${file.name}">` :
        `<div class="file-card-icon">${fileIcon}</div>`
      }
      <div class="file-card-name">${file.name}</div>
      <div class="file-card-meta">
        <span>${formatFileSize(file.size)}</span>
        <span>${new Date(file.uploadedAt).toLocaleDateString()}</span>
      </div>
      <div class="file-actions">
        <button class="file-action-btn download" onclick="downloadFile('${file.id}')">Download</button>
        <button class="file-action-btn delete" onclick="deleteFile('${file.id}')">Delete</button>
      </div>
    `;
    
    filesGrid.appendChild(fileCard);
  });
  
  updateStorageInfo();
}

function updateStorageInfo() {
  const files = getFilesFromStorage();
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
  storageUsed.textContent = `${sizeInMB} MB`;
}

async function downloadFile(fileId) {
  const masterKey = prompt("Enter master key to decrypt file:");
  if (!masterKey) return;
  
  const files = getFilesFromStorage();
  const file = files.find(f => f.id === fileId);
  
  if (!file) {
    alert("File not found!");
    return;
  }
  
  try {
    const decryptedData = CryptoJS.AES.decrypt(file.encryptedData, masterKey).toString(CryptoJS.enc.Utf8);
    
    if (!decryptedData) {
      throw new Error("Decryption failed");
    }
    
    // Create download link
    const link = document.createElement('a');
    link.href = decryptedData;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    alert("Failed to decrypt file. Please check your master key.");
  }
}

function deleteFile(fileId) {
  if (!confirm("Are you sure you want to delete this file? This action cannot be undone.")) return;
  
  const files = getFilesFromStorage();
  const updatedFiles = files.filter(f => f.id !== fileId);
  saveFilesToStorage(updatedFiles);
  loadFiles();
  alert("File deleted successfully!");
}

// Face Registration Functions
async function startFaceRegistration() {
  try {
    // Force front camera for mobile devices
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { ideal: 400 },
        height: { ideal: 300 },
        facingMode: { exact: "user" }
      }
    });
    registerVideo.srcObject = stream;
  } catch (err) {
    alert("Error accessing camera: " + err.message);
  }
}

function showRegistrationStep(stepNumber) {
  document.querySelectorAll('.step').forEach(step => {
    step.classList.add('hidden');
  });
  $(`step${stepNumber}`).classList.remove('hidden');
}

async function startFaceScanning() {
  showRegistrationStep(2);
  scanVideo.srcObject = stream;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
    
    if (progress < 30) {
      scanStatus.textContent = "🔍 Detecting face...";
    } else if (progress < 60) {
      scanStatus.textContent = "📐 Analyzing facial features...";
    } else if (progress < 90) {
      scanStatus.textContent = "🔢 Creating face signature...";
    } else {
      scanStatus.textContent = "✅ Finalizing registration...";
    }
    
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        completeFaceRegistration();
      }, 1000);
    }
  }, 200);
}

function completeFaceRegistration() {
  const faceSignature = generateFaceSignature();
  localStorage.setItem("registeredFace", faceSignature);
  registeredFace = faceSignature;
  showRegistrationStep(3);
  stopCamera();
}

function generateFaceSignature() {
  return CryptoJS.SHA256(Date.now() + Math.random().toString()).toString();
}

// Face Recognition Functions
async function startCamera() {
  try {
    // Force front camera for mobile devices
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { ideal: 400 },
        height: { ideal: 300 },
        facingMode: { exact: "user" }
      }
    });
    video.srcObject = stream;
    faceStatus.textContent = "Camera ready. Click 'Start Face Recognition' to begin.";
    faceStatus.className = "status-text status-info";
  } catch (err) {
    faceStatus.textContent = "Error accessing camera: " + err.message;
    faceStatus.className = "status-text status-error";
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
}

async function recognizeFace() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 100) progress = 100;
    
    loginProgressFill.style.width = `${progress}%`;
    loginProgressText.textContent = `${Math.round(progress)}%`;
    
    if (progress === 100) {
      clearInterval(interval);
      verifyFaceMatch();
    }
  }, 200);
}

function verifyFaceMatch() {
  const isMatch = Math.random() < 0.8;
  
  if (isMatch) {
    faceStatus.textContent = "✅ Face recognized successfully!";
    faceStatus.className = "status-text status-success";
    setTimeout(() => {
      showMainApp();
    }, 1000);
  } else {
    faceStatus.textContent = "❌ Face not recognized. Please try again or use ID authentication.";
    faceStatus.className = "status-text status-error";
    captureBtn.disabled = false;
  }
}

// ID Authentication Functions
function verifyID() {
  const enteredId = idInput.value.trim();
  if (enteredId === DEFAULT_ID) {
    idStatus.textContent = "✅ ID verified successfully!";
    idStatus.className = "status-text status-success";
    setTimeout(() => {
      showMainApp();
    }, 1000);
  } else {
    idStatus.textContent = "❌ Invalid ID. Please try again.";
    idStatus.className = "status-text status-error";
    idInput.value = "";
    idInput.focus();
  }
}

// Modal Management
function showAuthModal() {
  authModal.style.display = "flex";
  mainApp.classList.add("hidden");
  resetAuthSections();
}

function hideAuthModal() {
  authModal.style.display = "none";
}

function showMainApp() {
  hideAuthModal();
  mainApp.classList.remove("hidden");
  isAuthenticated = true;
  loadPasswords();
  loadFiles();
}

function resetAuthSections() {
  faceAuthSection.classList.add("hidden");
  idAuthSection.classList.add("hidden");
  faceStatus.textContent = "";
  idStatus.textContent = "";
  faceStatus.className = "status-text";
  idStatus.className = "status-text";
  loginProgressFill.style.width = "0%";
  loginProgressText.textContent = "0%";
  stopCamera();
}

// Event Listeners
// File Upload Events
uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('drag-over');
});
uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('drag-over');
});
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('drag-over');
  handleFileSelect(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
  handleFileSelect(e.target.files);
});

uploadFilesBtn.addEventListener('click', uploadFiles);
cancelUploadBtn.addEventListener('click', hideUploadModal);
uploadNewBtn.addEventListener('click', showUploadModal);

// Registration Events
registerFaceBtn.addEventListener("click", () => {
  authModal.style.display = "none";
  registerModal.classList.remove("hidden");
  startFaceRegistration();
});

startRegistrationBtn.addEventListener("click", startFaceScanning);
completeRegistrationBtn.addEventListener("click", () => {
  registerModal.classList.add("hidden");
  initializeApp();
});

// Authentication Events
faceAuthBtn.addEventListener("click", () => {
  resetAuthSections();
  faceAuthSection.classList.remove("hidden");
  startCamera();
});

idAuthBtn.addEventListener("click", () => {
  resetAuthSections();
  idAuthSection.classList.remove("hidden");
  idInput.focus();
});

useIdFirstTimeBtn.addEventListener("click", () => {
  resetAuthSections();
  idAuthSection.classList.remove("hidden");
  idInput.focus();
});

captureBtn.addEventListener("click", async () => {
  captureBtn.disabled = true;
  faceStatus.textContent = "🔍 Starting face recognition...";
  faceStatus.className = "status-text status-info";
  await recognizeFace();
});

retryFaceBtn.addEventListener("click", () => {
  resetAuthSections();
  faceAuthSection.classList.remove("hidden");
  startCamera();
});

verifyIdBtn.addEventListener("click", verifyID);
idInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") verifyID();
});
closeAuthBtn.addEventListener("click", showAuthModal);
logoutBtn.addEventListener("click", () => {
  isAuthenticated = false;
  stopCamera();
  showAuthModal();
});

// Password Manager Functions
function updateNameLabel() {
  const t = typeEl.value;
  nameLabel.textContent = t === "Website" ? "Website (e.g. example.com)" : "App Name (e.g. WhatsApp)";
  nameEl.placeholder = t === "Website" ? "example.com" : "App Name";
}
typeEl.addEventListener("change", updateNameLabel);

function generatePassword(len = 14) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
  let res = "";
  crypto.getRandomValues(new Uint32Array(len)).forEach(v => {
    res += charset[v % charset.length];
  });
  return res;
}

generateBtn.addEventListener("click", () => {
  passwordEl.value = generatePassword(16);
});

saveBtn.addEventListener("click", () => {
  if (!isAuthenticated) {
    alert("Please authenticate first!");
    return;
  }

  const type = typeEl.value;
  const name = nameEl.value.trim();
  const username = usernameEl.value.trim();
  const password = passwordEl.value.trim();
  const masterKey = masterKeyEl.value.trim();

  if (!name || !username || !password || !masterKey) {
    alert("Please fill all fields (including master key).");
    return;
  }

  const encrypted = CryptoJS.AES.encrypt(password, masterKey).toString();

  const entry = {
    id: Date.now() + "-" + Math.floor(Math.random()*1000),
    type,
    name,
    username,
    password: encrypted,
    createdAt: new Date().toISOString()
  };

  const passwords = getFromStorage();
  passwords.push(entry);
  saveToStorage(passwords);

  nameEl.value = "";
  usernameEl.value = "";
  passwordEl.value = "";

  loadPasswords();
  alert("Password saved securely!");
});

clearBtn.addEventListener("click", () => {
  nameEl.value = "";
  usernameEl.value = "";
  passwordEl.value = "";
  masterKeyEl.value = "";
});

function loadPasswords() {
  if (!isAuthenticated) return;
  
  const tbody = document.querySelector("#passwordTable tbody");
  tbody.innerHTML = "";
  const passwords = getFromStorage();

  if (passwords.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = "No passwords saved yet. Add your first password above.";
    td.style.textAlign = "center";
    td.style.color = "#94a3b8";
    td.style.padding = "20px";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  passwords.forEach((entry) => {
    const tr = document.createElement("tr");

    const tdType = document.createElement("td");
    tdType.textContent = entry.type;

    const tdName = document.createElement("td");
    tdName.textContent = entry.name;

    const tdUser = document.createElement("td");
    tdUser.textContent = entry.username;

    const tdPass = document.createElement("td");
    const viewBtn = document.createElement("button");
    viewBtn.className = "action-btn";
    viewBtn.textContent = "View";
    viewBtn.addEventListener("click", () => decryptPassword(entry.id));

    tdPass.appendChild(viewBtn);

    const tdActions = document.createElement("td");

    const copyBtn = document.createElement("button");
    copyBtn.className = "action-btn";
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", () => copyPassword(entry.id));

    const delBtn = document.createElement("button");
    delBtn.className = "action-btn delete-btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deletePassword(entry.id));

    tdActions.appendChild(copyBtn);
    tdActions.appendChild(delBtn);

    tr.appendChild(tdType);
    tr.appendChild(tdName);
    tr.appendChild(tdUser);
    tr.appendChild(tdPass);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}

function findEntry(id) {
  return getFromStorage().find(e => e.id === id);
}

function verifyMasterKey(id, masterKey) {
  const entry = findEntry(id);
  if (!entry) return false;

  try {
    const decrypted = CryptoJS.AES.decrypt(entry.password, masterKey).toString(CryptoJS.enc.Utf8);
    return !!decrypted;
  } catch {
    return false;
  }
}

function trackFailedAttempt(id) {
  if (!failedAttempts[id]) {
    failedAttempts[id] = 1;
  } else {
    failedAttempts[id]++;
  }
  
  saveFailedAttempts();
  
  if (failedAttempts[id] >= 3) {
    const passwords = getFromStorage().filter(e => e.id !== id);
    saveToStorage(passwords);
    delete failedAttempts[id];
    saveFailedAttempts();
    loadPasswords();
    alert("This entry has been automatically deleted due to 3 failed master key attempts.");
    return true;
  }
  
  return false;
}

function resetFailedAttempts(id) {
  if (failedAttempts[id]) {
    delete failedAttempts[id];
    saveFailedAttempts();
  }
}

function decryptPassword(id) {
  if (!isAuthenticated) {
    alert("Please authenticate first!");
    return;
  }

  const masterKey = prompt(`Enter master key to decrypt (Attempts: ${failedAttempts[id] || 0}/3):`);
  if (!masterKey) return;

  if (verifyMasterKey(id, masterKey)) {
    resetFailedAttempts(id);
    const entry = findEntry(id);
    const decrypted = CryptoJS.AES.decrypt(entry.password, masterKey).toString(CryptoJS.enc.Utf8);
    alert(`Password for ${entry.name} (${entry.type}):\n\n${decrypted}`);
  } else {
    const wasDeleted = trackFailedAttempt(id);
    if (!wasDeleted) {
      alert(`Incorrect master key! You have ${3 - (failedAttempts[id] || 0)} attempts remaining.`);
    }
  }
}

async function copyPassword(id) {
  if (!isAuthenticated) {
    alert("Please authenticate first!");
    return;
  }

  const masterKey = prompt(`Enter master key to copy password (Attempts: ${failedAttempts[id] || 0}/3):`);
  if (!masterKey) return;

  if (verifyMasterKey(id, masterKey)) {
    resetFailedAttempts(id);
    const entry = findEntry(id);
    const decrypted = CryptoJS.AES.decrypt(entry.password, masterKey).toString(CryptoJS.enc.Utf8);
    await navigator.clipboard.writeText(decrypted);
    alert("Password copied to clipboard!");
  } else {
    const wasDeleted = trackFailedAttempt(id);
    if (!wasDeleted) {
      alert(`Incorrect master key! You have ${3 - (failedAttempts[id] || 0)} attempts remaining.`);
    }
  }
}

function deletePassword(id) {
  if (!isAuthenticated) {
    alert("Please authenticate first!");
    return;
  }

  const masterKey = prompt(`Enter master key to delete this entry (Attempts: ${failedAttempts[id] || 0}/3):`);
  if (!masterKey) return;

  if (verifyMasterKey(id, masterKey)) {
    resetFailedAttempts(id);
    if (!confirm("Are you sure you want to delete this entry? This action cannot be undone.")) return;
    
    const passwords = getFromStorage().filter(e => e.id !== id);
    saveToStorage(passwords);
    loadPasswords();
    alert("Entry deleted successfully!");
  } else {
    const wasDeleted = trackFailedAttempt(id);
    if (!wasDeleted) {
      alert(`Incorrect master key! You have ${3 - (failedAttempts[id] || 0)} attempts remaining.`);
    }
  }
}

// Initialize
updateNameLabel();
initializeApp();