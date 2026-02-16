<template>
  <div class="p-4">
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">color :</h3>
      <UInput color="primary" placeholder="primary" />
      <UInput color="secondary" placeholder="secondary" />
      <UInput color="danger" placeholder="danger" />
      <UInput color="info" placeholder="info" />
      <UInput color="warning" placeholder="warning" />
      <UInput color="success" placeholder="success" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">size :</h3>
      <UInput size="sm" placeholder="primary" />
      <UInput size="md" placeholder="primary" />
      <UInput size="lg" placeholder="primary" />
    </section>
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">disabled :</h3>
      <UInput size="sm" placeholder="primary" disabled />
    </section>
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">title :</h3>
      <UInput size="sm" placeholder="primary" title="title" />
    </section>
    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">placeholder :</h3>
      <UInput size="sm" placeholder="placeholder" title="title" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">type :</h3>
      <UInput size="sm" type="number" />
    </section>

    <section class="p-3 flex items-center gap-3 border-b border-black">
      <h3 class="text-4xl">icon :</h3>
      <UInput size="sm" icon="u-arrow" />
      <UInput size="md" icon="u-arrow" icon-pos="left" />
    </section>
  </div>
</template>
