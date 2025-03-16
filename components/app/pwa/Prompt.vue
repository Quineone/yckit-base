<template>
  <ClientOnly>
    <div
      v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="fixed bottom-0 right-0 z-[100] m-6 rounded border border-gray-200 bg-white px-6 py-4 shadow-xl"
    >
      <p class="mb-2">
        {{ $pwa.offlineReady ? 'App ready to work offline' : 'New content available, click on reload button to update.' }}
      </p>
      <div class="flex gap-2">
        <UButton
          v-if="$pwa.needRefresh"
          @click="$pwa.updateServiceWorker()"
        >
          Reload
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          @click="$pwa.cancelPrompt()"
        >
          Close
        </UButton>
      </div>
    </div>

    <div
      v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
      class="fixed bottom-0 right-0 z-[100] m-6 rounded border border-gray-200 bg-white px-6 py-4 shadow-xl"
    >
      <p class="mb-2">
        Install PWA
      </p>
      <div class="flex gap-2">
        <UButton @click="$pwa.install()">
          Install
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          @click="$pwa.cancelInstall()"
        >
          Cancel
        </UButton>
      </div>
    </div>
  </ClientOnly>
</template>
