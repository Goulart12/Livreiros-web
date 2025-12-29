<script setup lang="ts">
import { DateStyle, DateTimeService } from '@/stores/dateTime'

interface Places {
  name: string
  address: string
  imageUrl: string
  typeOfStore: number
  typeOfBooks: Array<string>
  city: string
  state: string
  fromDate: string
  toDate: string
  fromTime: string
  toTime: string
  isAlwaysAvailable: boolean
}

enum TypeOfStore {
  Livraria = 1,
  BibliotecaSolidaria = 2,
  Doacao = 3,
  Sebos = 4,
}

const typeOfStoreName = (TypeOfStore: number) => {
  switch (TypeOfStore) {
    case 1:
      return 'Livraria'
    case 2:
      return 'Biblioteca Solidária'
    case 3:
      return 'Doação'
    case 4:
      return 'Sebos'
    default:
      return 'Desconhecido'
  }
}

interface Props {
  places: Array<Places>
}

defineProps<Props>()
</script>

<template>
  <div class="cards">
    <div class="card" v-for="place in places" :key="place.name">
      <img :src="place.imageUrl" :alt="place.name" />
      <h1>{{ place.name }}</h1>
      <h3>{{ typeOfStoreName(place.typeOfStore) }}</h3>
      <h2>{{ place.typeOfBooks.join(', ') }}</h2>
      <p>
        {{ place.city }}, {{ place.state }}
        <br />
        {{ place.address }}
      </p>
      <p v-if="!place.isAlwaysAvailable">
        De {{ DateTimeService.formatDate(place.fromDate) }} até
        {{ DateTimeService.formatDate(place.toDate) }}
      </p>
      <p>
        Das {{ DateTimeService.formatTime(place.fromTime) }} às
        {{ DateTimeService.formatTime(place.toTime) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  gap: 1.5rem;
}

.card img {
  width: 100%;
  height: 9.375rem;

  object-fit: cover;

  border-radius: 0.5rem 0.5rem 0 0;
}

.card h1 {
  margin-top: 2rem;
  font-size: 2.25rem;
  line-height: 2.5625rem;

  color: var(--title-color);
}

.card h3 {
  margin: 0.75rem 0;

  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2.125rem;
  color: var(--primary-color);
}

.card h2 {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: bold;
  color: var(--title-color);
}

.card p {
  font-size: 1rem;
  line-height: 1.625rem;

  color: var(--title-color);
}

@media (max-width: 900px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
