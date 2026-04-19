<script setup lang="ts">
import NavBarItem from './NavBarItem.vue'
</script>

<template>
  <div class="mr-6 flex h-dvh flex-col items-end gap-y-2 bg-orange-300 px-4 py-6">
    <img src="/logo_with_title.png" alt="Ludario logo" class="w-56 pb-6" />

    <NavBarItem>
      <template #navitem>Catalogue</template>
      <template #navicon>
        <img src="/navbaricons/blue_hexagon_book.png" />
      </template>
    </NavBarItem>

    <NavBarItem>
      <template #navitem>Charts</template>
      <template #navicon>
        <img src="/navbaricons/orange_hexagon_pie_chart.png" />
      </template>
    </NavBarItem>

    <NavBarItem>
      <template #navitem>Discover</template>
      <template #navicon>
        <img src="/navbaricons/orange_hexagon_explore.png" />
      </template>
    </NavBarItem>
  </div>
</template>
