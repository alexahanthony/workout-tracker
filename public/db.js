let db;
const request = indexedDB.open("workout", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log("Woops! " + event.target.errorCode);
};

function saveRecord(record) {
  const workout = db.workout(["pending"], "readwrite");
  const store = workout.objectStore("pending");

  store.add(record);
}

function checkDatabase() {
  const workout = db.workout(["pending"], "readwrite");
  const store = workout.objectStore("pending");
  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch("/api/workouts/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(() => {
          // delete records if successful
          const workout = db.workout(["pending"], "readwrite");
          const store = workout.objectStore("pending");
          store.clear();
        });
    }
  };
}
function deletePending() {
  const workout = db.workout(["pending"], "readwrite");
  const store = workout.objectStore("pending");
  store.clear();
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);
