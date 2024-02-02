<template>
    <div>
        <h1 class="font-bold">XU University Check-In</h1>
        <p>Check-in to your classes here</p>
        <button @click="checkIn">Check-In</button>
    </div>
</template>

<script setup>
function checkIn() {
    alert('You have checked in to your class');
}
</script>