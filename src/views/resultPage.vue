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
      <img src="../assets/logo.svg" alt="logomarca" height="3.125rem" />
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
  max-width: 78.125rem;

  margin: 0 auto;
}

.create-point-header {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.create-point-header img {
  height: 3.125rem;
  width: 11.25rem;
  margin-left: -1.875rem;
}

.create-point-header a {
  color: var(--title-color);
  font-weight: bold;
  cursor: pointer;

  display: flex;
  align-items: center;
}

.create-point-header a span {
  margin-right: 1rem;
  background-image: url('../assets/arrow-left.svg');

  display: flex;

  width: 1.25rem;
  height: 1.5rem;
}

main {
  margin: 3rem;
  margin-left: 0;
  margin-right: 0;
}

main h4 {
  font-weight: normal;
  font-family: Roboto, sans-serif;

  margin-bottom: 2rem;
}

@media (max-width: 900px) {
  #page-search-results {
    width: 100%;
  }

  .create-point-header {
    margin-left: -1rem;
    margin-right: 1.5rem;
    flex-direction: row;
    align-items: center;
  }

  .create-point-header img {
    margin-left: 0;
    margin-bottom: 1rem;
  }

  main {
    margin: 2rem 1rem;
  }
}
</style>
