<template>
    <Transition name="fade">
      <div
          v-show="showing"
          @click.self="close()"
          class="absolute z-50 w-full bg-black bg-opacity-30 h-screen backdrop-blur-sm top-0 left-0 flex justify-center px-8">
          <div v-if="showing" class="bg-white dark:bg-zinc-800 rounded-lg self-start mt-32 w-full md:w-1/2 lg:w-1/3 xl:w-1/3">
              <slot />
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
