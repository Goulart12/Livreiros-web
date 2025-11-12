<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ResultCard from '../components/resultCard.vue'
import api from '@/stores/api'

const router = useRouter()
const route = useRoute()
const goBackToHome = () => {
  router.push('/')
}

const response = ref<any>(null)
const places = ref<any>([])

const cityForQuery = String(route.query.city)
console.log('City for query:', cityForQuery)

onMounted(async () => {
  if (cityForQuery) {
    try {
      response.value = await api.get('/store', {
        params: { city: cityForQuery },
      })

      places.value = response.value.data
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.error('Resource not found (404):', error)
      } else {
        console.error('Error fetching places:', error)
      }
    }
  }

  console.log('API Response:', places.value)
})

const samplePlaces = ref<any>([
  {
    name: 'Livraria do Porto',
    address: 'Rua das Flores, 123',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/e/e9/Livraria_Cultura%2C_Avenida_Paulista%2C_S%C3%A3o_Paulo%2C_Brazil.jpg',
    typeOfStore: 1,
    typeOfBooks: ['Ficção', 'Infantil', 'Literatura Brasileira'],
    city: 'Porto Alegre',
    state: 'RS',
    dateFrom: '2025-11-01',
    dateTo: '2025-11-30',
    timeFrom: '09:00',
    timeTo: '18:00',
    isAlwaysAvailable: false,
  },
  {
    name: 'Biblioteca Solidária Esperança',
    address: 'Av. Central, 500',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/e/e9/Livraria_Cultura%2C_Avenida_Paulista%2C_S%C3%A3o_Paulo%2C_Brazil.jpg',
    typeOfStore: 2,
    typeOfBooks: ['Didáticos', 'Autoajuda'],
    city: 'São Paulo',
    state: 'SP',
    dateFrom: '2025-01-01',
    dateTo: '2025-12-31',
    timeFrom: '08:00',
    timeTo: '20:00',
    isAlwaysAvailable: true,
  },
  {
    name: 'Sebo Central',
    address: 'Praça Velha, 45',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/e/e9/Livraria_Cultura%2C_Avenida_Paulista%2C_S%C3%A3o_Paulo%2C_Brazil.jpg',
    typeOfStore: 4,
    typeOfBooks: ['Clássicos', 'Raros', 'HQ'],
    city: 'Rio de Janeiro',
    state: 'RJ',
    dateFrom: '2025-06-01',
    dateTo: '2025-09-30',
    timeFrom: '10:00',
    timeTo: '19:00',
    isAlwaysAvailable: false,
  },
])

const Total = computed(() => places.value.length)
</script>

<template>
  <div id="page-search-results">
    <header class="create-point-header">
      <img src="../assets/logo.svg" alt="logomarca" height="50px" />
      <a @click="goBackToHome">
        <span></span>
        Voltar
      </a>
    </header>

    <main>
      <h4>
        <strong>{{ Total }} pontos</strong> encontrados
      </h4>

      <result-card :places="places" />

      <h4 v-if="Total == 0"><strong>Nenhum</strong> local encontrado</h4>
    </main>
  </div>
</template>

<style scoped>
#page-search-results {
  width: 90%;
  max-width: 1250px;

  margin: 0 auto;
}

.create-point-header {
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.create-point-header img {
  height: 50px;
  width: 180px;
  margin-left: -30px;
}

.create-point-header a {
  color: var(--title-color);
  font-weight: bold;
  cursor: pointer;

  display: flex;
  align-items: center;
}

.create-point-header a span {
  margin-right: 16px;
  background-image: url('../assets/arrow-left.svg');

  display: flex;

  width: 20px;
  height: 24px;
}

main {
  margin: 48px;
  margin-left: 0;
  margin-right: 0;
}

main h4 {
  font-weight: normal;
  font-family: Roboto, sans-serif;

  margin-bottom: 32px;
}
</style>
