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
        <p>No lecture created yet. Check in and create one</p>
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
            <p class="col-span-3 p-2 my-2 font-bold">
              Enter the data for the lecture:
            </p>
            <form class="grid grid-cols-3 grid-rows-3 gap-y-2">
              <input
                v-model="lectureName"
                type="text"
                class="col-span-3 p-2 my-2 border rounded-md"
                placeholder="Lecture Name" />
              <input
                v-model="startingTime"
                type="time"
                class="col-span-3 p-2 my-2 border rounded-md"
                placeholder="Time" />
              <button
                type="button"
                class="flex items-center col-span-3 px-4 py-2 mx-auto my-2 text-white rounded-md bg-xublack hover:bg-slate-800 gap-x-2"
                @click="checkIn"
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
  const startingTime = ref("");

  function checkIn() {
    if (!lecture.value && !showModal.value) {
      showModal.value = true;
      return;
    }
    showModal.value = false;
    lecture.value = {
      name: lectureName.value,
      time: startingTime.value,
    };
    alreadyCheckedIn.value = true;
    alreadyCheckedIn.value = true;
  }
</script>
