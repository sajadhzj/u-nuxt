<script setup lang="ts">
const pressed = () => {
  console.log("here");
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">size :</h3>
      <UButton label="sallam" size="sm" @click="pressed()" />
      <UButton label="sallam" size="md" @click="pressed()" />
      <UButton label="sallam" size="lg" @click="pressed()" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">disabled :</h3>
      <UButton label="sallam" size="lg" disabled @click="pressed()" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">color :</h3>
      <UButton label="primary" color="primary" />
      <UButton label="secondary" color="secondary" />
      <UButton label="danger" color="danger" />
      <UButton label="warning" color="warning" />
      <UButton label="info" color="info" />
      <UButton label="success" color="success" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">type :</h3>
      <UButton label="submit" color="primary" type="submit" />
      <UButton label="reset" color="primary" type="reset" />
      <UButton label="button" color="primary" type="button" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">rounded :</h3>
      <UButton label="submit" rounded />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">outline :</h3>
      <UButton outline label="primary" color="primary" />
      <UButton outline label="secondary" color="secondary" />
      <UButton outline label="danger" color="danger" />
      <UButton outline label="warning" color="warning" />
      <UButton outline label="info" color="info" />
      <UButton outline label="success" color="success" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">Loading :</h3>
      <UButton loading label="submit" color="primary" type="submit" size="sm" />
      <UButton loading label="reset" color="primary" type="reset" size="md" />
      <UButton loading label="button" color="primary" type="button" size="lg" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">aria label :</h3>
      <UButton loading aria-label="submit" color="primary" type="submit" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">Icon :</h3>
      <UButton label="next action" icon="u-arrow" />
      <UButton label="next action" icon="u-arrow" icon-pos="left" />
      <UButton
        label="next action"
        icon="u-arrow"
        icon-pos="left"
        icon-color="text-red-500"
      />
    </section>
  </div>
</template>
