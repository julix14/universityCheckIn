<template>
    <div>

        <nav class="bg-xublack text-white md:flex md:items-center md:justify-between">
          <div class="px-4 py-2 flex justify-between items-center">
            <!-- Logo placeholder -->
            <div class="flex items-center flex-col bg-white rounded-md">
                <img class="h-20" src="/logo.svg" alt="XU Logo">
            </div>
            
            <!-- Hamburger Menu Button -->
            <button class="md:hidden px-2 py-1 rounded" @click="toggleMenu">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
  
          <!-- Mobile Menu -->
          <div v-if="showMenu" class="px-4 pb-3 space-y-1 md:hidden">
            <NuxtLink href="/check-in" class="block px-3 py-2 rounded-md text-base font-medium">Check-In</NuxtLink>
            <NuxtLink href="/group-management" class="block px-3 py-2 rounded-md text-base font-medium">Group-Management</NuxtLink>
            <NuxtLink href="/profile" class="block px-3 py-2 rounded-md text-base font-medium">Profile</NuxtLink>
          </div>
  
          <!-- Desktop Menu -->
          <div class="hidden md:block">
            <div class="px-2 pt-2 pb-3 space-y-1">
              <NuxtLink href="/check-in" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Check-In</NuxtLink>
              <NuxtLink href="/group-management" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Group-Management</NuxtLink>
              <NuxtLink href="/profile" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</NuxtLink>
        
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
  