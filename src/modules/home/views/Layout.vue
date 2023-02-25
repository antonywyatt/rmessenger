<template>
    <!-- new usuario -->
    <Modal
        :showing="!exists">
        <div class="space-y-2 p-4">
            <div class="text-center">
                <h1 class="text-xl font-black text-zinc-800">Activemos tu usuario</h1>
                <p class="text-sm text-zinc-500">¿Cómo quieres que te llamemos? 😁</p>
            </div>
            <Transition
            name="slide-fade"
            mode="out-in">
                <div v-if="!isLoading">
                    <form @submit.prevent="onSubmit()" class="pt-2">
                        <div class="space-y-1">
                            <label for="" class="text-xs mx-2">Username <span class="text-rose-500">{{ error ? 'Máx. 15 caracteres' : '' }}</span></label>
                            <input 
                                required
                                v-model="usuario.username" 
                                type="text" 
                                placeholder="Username" 
                                @keypress="ValidarNumero"
                                title="Con este usuario te encontraran tus amigos"
                                :class="{'ring-2 ring-rose-500' : error || errorMsg}"
                                class="w-full px-2 py-2 border-b-2 outline-none focus:border-emerald-500 bg-zinc-100 rounded-md">
                            <p v-if="errorMsg" class="text-xs text-red-500">Este usuario ya éxiste</p>
                        </div>
                        <div class="space-y-1">
                            <label for="" class="text-xs mx-2">Estado</label>
                            <textarea 
                                v-model="usuario.status" 
                                type="text" 
                                placeholder="¿En que piensas?" 
                                class="border-b-2 w-full focus:border-emerald-500 px-2 py-2 outline-none bg-zinc-100 rounded-md"></textarea>
                        </div>
                        <div class="mt-2">
                            <button
                                :class="{'opacity-50' : error || errorMsg}"
                                :disabled="error || errorMsg" 
                                class="w-full bg-black hover:bg-zinc-900 text-white rounded-md py-2">Activar <fa icon="check-circle"/></button>
                        </div>
                    </form>
                </div>
                <div v-else class="text-center py-8 space-y-3">
                    <fa icon="spinner" class="text-3xl text-zinc-300 animate-spin"/>
                    <p class="text-zinc-500 text-xs">No tardaremos nada...</p>
                </div>
            </Transition>
        </div>
    </Modal>
    <!-- new chat -->
    <Modal
        :showing="new_chat"
        @close="new_chat = false">
        <div class="p-4">
            <h1 class="font-black dark:text-white text-lg">Nuevo chat</h1>
            <div v-if="user_select.i == true" class="my-2 flex justify-between items-center border dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-700 p-2 rounded-md">
                <h1 class="dark:text-white">{{ user_select.username }}</h1>
                <button class="dark:text-white" @click="user_select.i = false, query = ''"><fa icon="xmark"/></button>
            </div>
            <div v-else class="my-2">
                <input 
                v-model="query"
                @keyup="onSearch()"
                type="text"
                placeholder="Buscar amigo" 
                class="w-full p-2 bg-zinc-100 border-b-2 dark:border-zinc-700 focus:border-emerald-500 dark:focus:border-emerald-500 dark:text-white dark:bg-zinc-900 rounded-md outline-none">
            </div>
            <div v-if="usuarios.length" class="absolute bg-white border dark:border-zinc-700 z-30 dark:bg-zinc-900 w-1/2 md:w-1/2 lg:w-1/4 rounded-md max-h-48 overflow-y-auto">
                <ul class="">
                    <li v-for="user in usuarios" :key="user" @click="selectUser(user), usuarios = []" class="flex cursor-default hover:bg-zinc-200 dark:hover:bg-zinc-700 space-x-2 px-2 items-center border-b dark:border-zinc-800 py-2">
                        <div class="h-8 w-8 rounded-full flex justify-center items-center bg-emerald-400">
                            <fa icon="user"/>
                        </div>
                        <div class="">
                            <h1 class="font-medium dark:text-white">{{ user.username }}</h1>
                            <p class="text-xs text-zinc-700 dark:text-zinc-600">{{ user?.status.substr(-2000, 20)}}...</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="py-2">
                <button
                    :class="{'opacity-50' : user_select.i == false}"
                    :disabled="user_select.i == false"
                    @click="onCreate()"
                    class="bg-black hover:bg-zinc-900 text-white w-full py-2 rounded-md">
                    <fa icon="user-plus"/> Invitar al chat
                </button>
            </div>
            <p class="text-xs text-zinc-500 dark:text-zinc-500">Todos los usuarios son visibles.</p>
        </div>
    </Modal>
    <div class="flex flex-wrap min-h-screen dark:bg-zinc-900">
        <History 
            :is-active-chat="isActiveChat"
            :open-history="open"
            />
        <div class="w-full md:w-2/3">
            <div v-if="chat_existe" class="container mx-auto md:px-10 px-4 h-screen ">
                <Chat />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '../../auth/composables/useAuth';
import History from '../components/History.vue';
import Modal from '../components/Modal.vue';
import Chat from '../pages/Chat.vue';
import { useHome } from '../composables/useHome';
import { useSalas } from '../composables/useSalas';

const router = useRouter()
const chat_existe = ref(false)

const {
    isActiveChat,
    new_chat,
    user_select,
    selectUser,
    createSala,
    watchRealtime
} = useHome()

const query = ref('')

const {
    exists,
    usuario,
    postUsuario,
    searchUser,
    usuarios
} = useAuth()

const {
    isSalas
} = useSalas()

const open = ref(false)
const isLoading = ref(false)
const error = ref(false)
const errorMsg = ref(false)


const ValidarNumero = (e) =>{
	if(e.keyCode == 32 || usuario.value.username.length > 15){
        e.preventDefault()
    }
}

const onSubmit = async () => {
    isLoading.value = true
    await postUsuario().then(resp => {
        if(resp.error == null){
            exists.value = true
        }else{
            isLoading.value = false
            errorMsg.value = true
        }
    }).catch(err => {
        isLoading.value = false
        errorMsg.value = true
    })
}

const onSearch = async () => {
    if(query.value.length >= 3){
        await searchUser(query.value)
    }
}


const onCreate = async () => {
    if(isSalas.value.length){
        isSalas.value.map(async item => {
            if(user_select.value.username === item.username){
                new_chat.value = false
                query.value = '',
                user_select.value = {i: false}
                usuarios.value = []
                localStorage.setItem('_c_', item.sala_id )
                chat_existe.value = true
            }else{
                //doble sala para mi y destino
                await createSala(usuario.value).then(resp => {
                    new_chat.value = false
                    query.value = '',
                    user_select.value = {i: false}
                    usuarios.value = []
                    localStorage.setItem('_c_', resp[0]?.sala_id )
                    chat_existe.value = true
                })
            }
        })
    }else{
        //doble sala para mi y destino
        await createSala(usuario.value).then(resp => {
            new_chat.value = false
            query.value = '',
            user_select.value = {i: false}
            usuarios.value = []
            localStorage.setItem('_c_', resp[0]?.sala_id )
            chat_existe.value = true
        })
    }
}

watch(
    () => usuario.value.username,
    () => {
        if(usuario.value.username?.length > 15) {
            error.value = true 
        }else{
            error.value = false
        }
        errorMsg.value = false
    }
)

watch(
    () => query.value,
    () => {
        if(query.value.length <= 0){
            usuarios.value = []
        }
    }
)

onMounted(() => {
    const chat_id = localStorage.getItem('_c_')
    if(!chat_id){
        chat_existe.value = false
    }else{
        chat_existe.value = true
        watchRealtime(chat_id)
    }
})


</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>