<template>
  <div>
    <button
      v-if="!loading"
      type="button"
      class="flex items-center px-4 py-2 mx-auto my-2 text-white rounded-md bg-xublack hover:bg-slate-800 gap-x-2">
      <span class="material-symbols-outlined"> {{ symbol }} </span>
      {{ text }}
    </button>
    <button
      v-else
      type="button"
      class="flex items-center px-4 py-2 mx-auto my-2 text-white rounded-md bg-gray-500 cursor-not-allowed gap-x-2"
      disabled>
      <span class="material-symbols-outlined animate-spin">
        {{ loadingSymbol }}
      </span>
      {{ loadingText }}
    </button>
  </div>
</template>

<script setup>
  defineProps({
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    loadingText: {
      type: String,
      required: false,
      default: "Loading...",
    },
    symbol: {
      type: String,
      required: false,
      default: "done",
    },
    loadingSymbol: {
      type: String,
      required: false,
      default: "autorenew",
    },
  });
</script>
