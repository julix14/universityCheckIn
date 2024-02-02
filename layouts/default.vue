<template>
  <div>
    <nav
      class="text-white bg-xublack md:flex md:items-center md:justify-between">
      <div class="flex items-center justify-between px-4 py-2">
        <!-- Logo placeholder -->
        <div class="flex flex-col items-center bg-white rounded-md">
          <img
            class="h-20"
            src="/logo.svg"
            alt="XU Logo" />
        </div>

        <!-- Hamburger Menu Button -->
        <button
          class="px-2 py-1 rounded md:hidden"
          @click="toggleMenu">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="showMenu"
        class="px-4 pb-3 space-y-1 md:hidden">
        <NuxtLink
          href="/check-in"
          class="block px-3 py-2 text-base font-medium rounded-md"
          >Check-In</NuxtLink
        >
        <NuxtLink
          href="/group-management"
          class="block px-3 py-2 text-base font-medium rounded-md"
          >Group-Management</NuxtLink
        >
        <NuxtLink
          href="/profile"
          class="block px-3 py-2 text-base font-medium rounded-md"
          >Profile</NuxtLink
        >
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:block">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            href="/check-in"
            class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >Check-In</NuxtLink
          >
          <NuxtLink
            href="/group-management"
            class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >Group-Management</NuxtLink
          >
          <NuxtLink
            href="/profile"
            class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >Profile</NuxtLink
          >
        </div>
      </div>
    </nav>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
  const authenticated = ref(true);
  const showMenu = ref(false);
  const toggleMenu = () => {
    showMenu.value = !showMenu.value;
  };
</script>
