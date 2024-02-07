<template>
  <div class="flex items-center justify-center">
    <div
      class="flex flex-col items-center p-5 m-10 border rounded-md border-1 gap-y-2 max-w-fit">
      <h1 class="font-bold">XU University Check-In</h1>
      <p v-show="!alreadyCheckedIn">Check in for today!</p>
      <p v-show="alreadyCheckedIn">You have checked in for today!</p>
      <div v-if="lecture">
        <p>Class: {{ lecture.name }}</p>
        <p>Starting at: {{ lecture.start_time }}</p>
      </div>
      <div v-else>
        <p>
          No lecture created yet. <br />
          Create one and check in!
        </p>
      </div>
      <button
        v-if="!loading"
        type="button"
        class="flex items-center px-4 py-2 text-white rounded-md bg-xublack hover:bg-slate-800 gap-x-2"
        @click="checkIn"
        v-show="!alreadyCheckedIn">
        <span class="material-symbols-outlined">done</span>
        Check-In
      </button>
      <button
        v-else
        type="button"
        class="flex items-center px-4 py-2 mx-auto my-2 text-white rounded-md bg-gray-500 cursor-not-allowed gap-x-2"
        disabled>
        <span class="material-symbols-outlined">autorenew</span>
        Loading...
      </button>
      <SuccessCheck v-show="alreadyCheckedIn" />
    </div>

    <!-- Create Lecture Modal-->
    <div
      v-if="showModal"
      class="fixed inset-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
      <div
        class="relative p-5 mx-auto bg-white border rounded-md shadow-lg w-80 top-20">
        <div class="mt-3">
          <div class="mt-2">
            <p class="p-2 my-2 font-bold">Enter the data for the lecture:</p>
            <form class="flex flex-col">
              <input
                v-model="lectureName"
                type="text"
                class="p-2 my-2 border rounded-md"
                placeholder="Lecture Name" />
              <input
                v-model="startTime"
                type="time"
                class="p-2 my-2 border rounded-md"
                placeholder="Time" />
              <p
                v-if="displayError"
                class="text-red-600">
                {{ errorMessage }}
              </p>
              <button
                v-if="!loading"
                type="button"
                class="flex items-center px-4 py-2 mx-auto my-2 text-white rounded-md bg-xublack hover:bg-slate-800 gap-x-2"
                @click="createLectureAndCheckIn"
                v-show="!alreadyCheckedIn">
                <span class="material-symbols-outlined">done</span>
                {{ lecture ? "Check-In" : "Create Lecture and Check-In" }}
              </button>
              <button
                v-else
                type="button"
                class="flex items-center px-4 py-2 mx-auto my-2 text-white rounded-md bg-gray-500 cursor-not-allowed gap-x-2"
                disabled>
                <span class="material-symbols-outlined">autorenew</span>
                Loading...
              </button>
            </form>
          </div>
        </div>
        <div
          class="absolute top-0 right-0 p-2 cursor-pointer"
          @click="showModal = false">
          <span class="material-symbols-outlined">close</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // General Values
  const alreadyCheckedIn = ref(false);
  const showModal = ref(false);
  const lecture = ref(null);
  const loading = ref(true);

  // Modal Values
  const lectureName = ref("");
  const startTime = ref("");

  // Error handling
  const displayError = ref(false);
  const errorMessage = ref("Please fill in all fields.");

  // Fetch lecture data
  async function fetchLectureData() {
    const lectureDateObj = new Date();
    const lectureDateStr = lectureDateObj.toISOString().split("T")[0];
    const { data } = await useFetch("/api/lecture", {
      method: "GET",
      query: {
        lectureDate: lectureDateStr,
        groupId: 1, //TODO: get the group id from the user
      },
    });

    if (data.value.statusCode === 404) {
      return;
    }
    return data.value.body ? await JSON.parse(data.value.body) : null;
  }

  async function checkIfCheckedIn() {
    const lectureDateObj = new Date();
    const lectureDateStr = lectureDateObj.toISOString().split("T")[0];
    const { data } = await useFetch("/api/check-in", {
      method: "GET",
      query: {
        lectureDate: lectureDateStr,
        userId: 1, //TODO: get the user id from the user
        groupId: 1, //TODO: get the group id from the user
      },
    });

    return data.value.statusCode !== 404;
  }

  // Initialize lecture data
  async function init() {
    Promise.all([fetchLectureData(), checkIfCheckedIn()])
      .then(([lectureFromDB, checkedIn]) => {
        if (lectureFromDB) {
          lecture.value = lectureFromDB;
          lecture.value.start_time = new Date(
            lecture.value.start_time
          ).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
        }
        alreadyCheckedIn.value = checkedIn;
      })
      .catch((error) => {
        console.error(error);
      });
    loading.value = false;
  }
  init();

  // CheckIn if there is no lecture
  async function createLectureAndCheckIn() {
    loading.value = true;
    if (!lectureName.value || !startTime.value) {
      displayError.value = true;
      errorMessage.value = "Please fill in all fields.";
      return;
    }
    displayError.value = false;

    // transform the time to a timestamp
    const currentDate = new Date();
    const [hours, minutes] = startTime.value.split(":").map(Number);
    currentDate.setHours(hours, minutes, 0, 0);
    const timestamp = currentDate;
    try {
      const { body: lectureFromDB } = await $fetch("/api/lecture", {
        method: "PUT",
        body: JSON.stringify({
          lectureName: lectureName.value,
          startTime: timestamp,
          groupId: 1, //TODO: get the group id from the user
        }),
      });

      // Set the lecture value to the lecture from the database
      lecture.value = await JSON.parse(lectureFromDB);

      // Format the date to a readable string
      lecture.value.start_time = new Date(
        lecture.value.start_time
      ).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

      // Check in the user
      const { body: checkIn } = await $fetch("/api/check-in", {
        method: "PUT",
        body: JSON.stringify({
          lectureId: lecture.value.id,
          userId: 1, //TODO: get the user id from the user
          //TODO: Add Location later
        }),
      });

      showModal.value = false;
      alreadyCheckedIn.value = true;
    } catch (error) {
      console.error(error);
      errorMessage.value = "An error occurred. Please try again.";
      displayError.value = true;
      return;
    } finally {
      loading.value = false;
    }
  }

  // CheckIn if there is a lecture
  async function checkIn() {
    // If there is no lecture and the modal is not shown, show the modal
    if (!lecture.value && !showModal.value) {
      showModal.value = true;
      return;
    }
    loading.value = true;
    try {
      const { data: checkIn } = await $fetch("/api/check-in", {
        method: "PUT",
        body: JSON.stringify({
          lectureId: lecture.id,
          userId: 1,
        }),
      });
    } catch (error) {
      console.error(error);
    }

    alreadyCheckedIn.value = true;
    loading.value = false;
  }
</script>
