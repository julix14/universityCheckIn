<template>
  <div class="flex items-center justify-center">
    <div
      class="flex flex-col items-center p-5 m-10 border rounded-md border-1 gap-y-2 max-w-fit">
      <h1 class="font-bold">XU University Check-In</h1>
      <p v-show="!alreadyCheckedIn">Check in for today!</p>
      <p v-show="alreadyCheckedIn">You have checked in for today!</p>
      <div v-if="lecture">
        <p>Class: {{ lecture.name }}</p>
        <p>Starting at: {{ lecture.time }}</p>
      </div>
      <div v-else>
        <p>
          No lecture created yet. <br />
          Check in and create one.
        </p>
      </div>
      <button
        type="button"
        class="flex items-center px-4 py-2 text-white rounded-md bg-xublack hover:bg-slate-800 gap-x-2"
        @click="checkIn"
        v-show="!alreadyCheckedIn">
        <span class="material-symbols-outlined"> done </span>
        Check-In
      </button>
      <SuccessCheck v-show="alreadyCheckedIn" />
    </div>
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
                type="button"
                class="flex items-center px-4 py-2 mx-auto my-2 text-white rounded-md bg-xublack hover:bg-slate-800 gap-x-2"
                @click="createLecture"
                v-show="!alreadyCheckedIn">
                <span class="material-symbols-outlined"> done </span>
                Check-In
              </button>
            </form>
          </div>
        </div>
        <div
          class="absolute top-0 right-0 p-2 cursor-pointer"
          @click="showModal = false">
          <span class="material-symbols-outlined"> close </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const alreadyCheckedIn = ref(false);
  const showModal = ref(false);
  const lecture = ref();

  const lectureName = ref("");
  const startTime = ref("");

  const displayError = ref(false);
  const errorMessage = ref("Please fill in all fields.");

  function showError() {
    displayError.value = true;
  }

  async function createLecture() {
    if (!lectureName.value || !startTime.value) {
      displayError.value = true;
      errorMessage.value = "Please fill in all fields.";
      return;
    }
    displayError.value = false;

    const currentDate = new Date();
    const [hours, minutes] = startTime.value.split(":").map(Number);
    currentDate.setHours(hours, minutes, 0, 0);
    const timestamp = currentDate;

    try {
      const { data: lectureFromDB } = await $fetch("/api/lecture", {
        method: "PUT",
        body: JSON.stringify({
          lectureName: lectureName.value,
          startTime: timestamp,
          groupId: 1,
        }),
      });
      console.log(lectureFromDB);
      lecture.value = lectureFromDB;

      const { data: checkIn } = await $fetch("/api/check-in", {
        method: "PUT",
        body: JSON.stringify({
          lectureId: lecture.id,
          userId: 1,
        }),
      });

      console.log(checkIn);
    } catch (error) {
      console.error(error);
    }
    showModal.value = false;
  }

  async function checkIn() {
    // If there is no lecture and the modal is not shown, show the modal
    if (!lecture.value || !showModal.value) {
      showModal.value = true;
      return;
    }

    try {
      const { data: checkIn } = await $fetch("/api/check-in", {
        method: "PUT",
        body: JSON.stringify({
          lectureId: lecture.id,
          userId: env("DEMO_USER_ID"),
        }),
      });
      console.log(checkIn);
    } catch (error) {
      console.error(error);
    }

    lecture.value = {
      name: lectureName.value,
      time: startTime.value,
    };

    alreadyCheckedIn.value = true;
  }
</script>
