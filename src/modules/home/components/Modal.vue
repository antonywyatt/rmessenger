<template>
    <Transition name="fade">
      <div
            v-if="showing"
            @dblclick.self="close()"
            class="fixed inset-0 w-full h-full z-20 bg-semi-75 duration-300 overflow-y-auto"
            x-transition:enter="transition duration-300"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition duration-300"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            >
            <div class="relative sm:w-3/4 md:w-1/2 lg:w-1/3 mx-2 sm:mx-auto mt-20 mb-10 opacity-100 p-4 bg-white dark:bg-zinc-900 rounded-lg border dark:border-zinc-800">
                <div
                class="relative z-20"
                x-transition:enter="transition transform duration-300"
                x-transition:enter-start="scale-0"
                x-transition:enter-end="scale-100"
                x-transition:leave="transition transform duration-300"
                x-transition:leave-start="scale-100"
                x-transition:leave-end="scale-0"
                >

                <slot />
                </div>
            </div>
        </div>
  </Transition>
</template>
 
<script>
import { onMounted } from 'vue'

export default {
  props: {
    showing: {
      required: true,
      type: Boolean
    }
  },
  emits: ['close'],
  setup(props, {emit}){
        const close = () => {
            emit('close')
        }
	
	// texto para eliminar

        onMounted(() => {
          /** Evento para cerrar ventanas emergentes */
            document.addEventListener("keydown", function (event) {
                if (event.keyCode === 27) {
                    close()
                }
            });
        })

        return {
            close
        }
  }
}
</script>

<style scoped>
    .bg-semi-75{
      background: linear-gradient(rgba(19, 19, 24, 0.82), rgba(2, 2, 2, 0.747))
    }

    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }

    
</style>
