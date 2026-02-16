<template>
  <div class="flex flex-col gap-3">
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">name :</h3>
      <UIcon name="u-arrow" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">class :</h3>
      <UIcon name="u-arrow" class="text-red-500 hover:text-blue-500" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">size :</h3>
      <UIcon name="u-arrow" :size="50" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">strokeWidth :</h3>
      <UIcon name="u-arrow" :strokeWidth="5" />
    </section>
  </div>
</template>
