<script lang="ts" setup>
const items = [
  {
    text: "one",
    value: 1,
  },
  {
    text: "two",
    value: 2,
  },
];

const selected = ref(2);
</script>

<template>
  <div class="p-4">
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">color :</h3>
      <USelect :options="items" color="primary" placeholder="primary" />
      <USelect :options="items" color="secondary" placeholder="secondary" />
      <USelect :options="items" color="success" placeholder="success" />
      <USelect :options="items" color="info" placeholder="info" />
      <USelect :options="items" color="warning" placeholder="warning" />
      <USelect :options="items" color="danger" placeholder="danger" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">placeholder :</h3>
      <USelect :options="items" color="primary" placeholder="primary" />
      <USelect :options="items" color="secondary" placeholder="secondary" />
      <USelect :options="items" color="success" placeholder="success" />
      <USelect :options="items" color="info" placeholder="info" />
      <USelect :options="items" color="warning" placeholder="warning" />
      <USelect :options="items" color="danger" placeholder="danger" />
    </section>
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">options :</h3>
      <USelect :options="items" color="primary" placeholder="primary" />
      <USelect :options="items" color="secondary" placeholder="secondary" />
      <USelect :options="items" color="success" placeholder="success" />
      <USelect :options="items" color="info" placeholder="info" />
      <USelect :options="items" color="warning" placeholder="warning" />
      <USelect :options="items" color="danger" placeholder="danger" />
    </section>
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">searchable :</h3>
      <USelect
        :options="items"
        color="primary"
        placeholder="primary"
        searchable
      />
    </section>
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">loading :</h3>
      <USelect :options="items" loading placeholder="loading" />
    </section>
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">size :</h3>
      <USelect size="lg" :options="items" loading placeholder="loading" />
    </section>
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">active item :</h3>
      <USelect
        v-model="selected"
        size="lg"
        :options="items"
        placeholder="loading"
      />
    </section>
  </div>
</template>
