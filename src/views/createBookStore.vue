<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import bookIcon from '../assets/book.svg'
import studyIcon from '../assets/study.svg'
import magazineIcon from '../assets/magazine.svg'
import superheroIcon from '../assets/superhero.svg'
import libraryIcon from '../assets/library.svg'
import api from '@/stores/api'

const router = useRouter()

const goBackToHome = () => {
  router.push('/')
}

const isTemporary = ref(false)
const selectedName = ref('')
const selectedPoint = ref('')
const selectedAddress = ref('')
const selectedAddress2 = ref('')
const selectedFullAddress = computed(() => {
  if (!selectedAddress.value || !selectedAddress2.value) return ''
  return `${selectedAddress.value}, ${selectedAddress2.value}`
})
const selectedFromDate = ref()
const selectedToDate = ref()
const selectedFromTime = ref('')
const selectedToTime = ref('')
const storeImage = ref<string | null>(null)

const storeTypes = [
  { label: 'Livraria', value: 1 },
  { label: 'Biblioteca solidária', value: 2 },
  { label: 'Doação', value: 3 },
  { label: 'Sebos', value: 4 },
]

const states = ref([])
const cities = ref([])

const selectedUF = ref('')
const selectedCity = ref('')
const selectedStateName = ref('')

const citiesLoading = ref(false)

async function populateUFs() {
  const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  states.value = await response.json()
}

onMounted(() => {
  populateUFs()
})

async function getCities(event) {
  const ufValue = event.target.value

  const selectedIndex = event.target.selectedIndex
  selectedStateName.value = event.target.options[selectedIndex].text

  selectedCity.value = ''
  cities.value = []
  citiesLoading.value = true

  if (!ufValue) {
    citiesLoading.value = false
    return
  }

  const response = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`,
  )

  cities.value = await response.json()
  citiesLoading.value = false
}

function convertTimeToIso(time) {
  if (!time) return null

  const today = new Date()
  const [hours, minutes] = time.split(':')
  today.setHours(hours, minutes, 0, 0)
  return today.toISOString()
}

function onImageSelected(event) {
  const file = event.target.files[0]
  if (!file) return

  // if (file.size > 5 * 1024 * 1024) {
  //   alert('Imagem acima de 5MB!')
  //   return
  // }

  const reader = new FileReader()

  reader.onload = () => {
    const base64String = reader.result

    storeImage.value = base64String
  }

  reader.readAsDataURL(file)
}

const typeOfBooks = [
  { id: 1, label: 'Livros', icon: bookIcon },
  { id: 2, label: 'Livros Didáticos', icon: studyIcon },
  { id: 3, label: 'Revistas', icon: magazineIcon },
  { id: 4, label: 'Quadrinhos', icon: superheroIcon },
  // { id: 5, label: 'Todos os tipos', icon: libraryIcon },
]

const selectedTypeOfBooks = ref([])

function toggleItem(itemLabel) {
  const idx = selectedTypeOfBooks.value.indexOf(itemLabel)
  if (idx >= 0) {
    selectedTypeOfBooks.value.splice(idx, 1)
  } else {
    selectedTypeOfBooks.value.push(itemLabel)
  }
}

async function createForm() {
  const inputModel = {
    name: selectedName.value,
    typeOfStore: selectedPoint.value,
    address: selectedFullAddress.value,
    city: selectedCity.value,
    state: selectedStateName.value,
    fromDate:
      isTemporary.value && selectedFromDate.value
        ? new Date(selectedFromDate.value).toISOString()
        : null,
    toDate:
      isTemporary.value && selectedToDate.value
        ? new Date(selectedToDate.value).toISOString()
        : null,
    fromTime: convertTimeToIso(selectedFromTime.value),
    toTime: convertTimeToIso(selectedToTime.value),
    storeImage: storeImage.value,
    typeOfBooks: selectedTypeOfBooks.value,
    isAlwaysAvailable: !isTemporary.value,
  }

  console.log('Input Model:', inputModel)

  try {
    const response = await api.post('/store/create', inputModel)
    console.log('Success:', response.data)
  } catch (error) {
    console.error('Error creating store:', error)
  }
}
</script>

<template>
  <div id="page-create-point">
    <header class="create-point-header">
      <img src="../assets/logo.svg" alt="logomarca" height="50px" />
      <a @click="goBackToHome">
        <span></span>
        Voltar
      </a>
    </header>

    <div class="create-point-form">
      <h1>Cadastro do ponto de vendas/doações</h1>

      <fieldset>
        <legend>
          <h2>Dados da entidade</h2>
        </legend>

        <div class="field-group">
          <div class="field">
            <label for="name">Nome da entidade</label>
            <input type="text" name="name" v-model="selectedName" required />
          </div>

          <div class="field">
            <label for="point">Tipo de ponto</label>

            <select v-model="selectedPoint" required>
              <option disabled value="">Selecione um tipo de ponto</option>
              <option v-for="p in storeTypes" :key="p.value" :value="p.value">
                {{ p.label }}
              </option>
            </select>

            <input type="hidden" :value="selectedPoint" id="point" />
          </div>
        </div>

        <div class="field-group">
          <div class="field">
            <label for="address">Endereço</label>
            <input type="text" name="address" v-model="selectedAddress" required />
          </div>

          <div class="field">
            <label for="address2">Número/Complemento</label>
            <input type="text" name="address2" v-model="selectedAddress2" required />
          </div>
        </div>

        <div class="field-group">
          <div class="field">
            <label for="state">Estado</label>

            <select v-model="selectedUF" @change="getCities" required>
              <option value="">Selecione o Estado</option>
              <option v-for="state in states" :key="state.id" :value="state.id">
                {{ state.nome }}
              </option>
            </select>

            <input type="hidden" name="state" :value="selectedStateName" />
          </div>

          <div class="field">
            <label for="city">Cidade</label>

            <select v-model="selectedCity" :disabled="citiesLoading || !selectedUF">
              <option value="">Selecione a Cidade</option>
              <option v-for="city in cities" :key="city.nome" :value="city.nome">
                {{ city.nome }}
              </option>
            </select>

            <input type="hidden" name="city" :value="selectedCity" />
          </div>
        </div>

        <div class="field-group">
          <div class="field">
            <label for="fromTime">Horário de funcionamento de</label>
            <input type="time" name="fromTime" v-model="selectedFromTime" />
          </div>

          <div class="field">
            <label for="toTime">Horário de funcionamento até</label>
            <input type="time" name="toTime" v-model="selectedToTime" />
          </div>
        </div>

        <div class="field-group">
          <div class="field">
            <label for="imageUpload">Imagem da entidade</label>
            <input
              type="file"
              id="imageUpload"
              name="imageFile"
              accept="image/*"
              @change="onImageSelected"
            />
          </div>
        </div>

        <div class="field-group">
          <div class="checkbox-wrapper-28">
            <label for="tmp-28"> É temporário?</label>
            <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
              <symbol id="checkmark-28" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  fill="none"
                  d="M22.9 3.7l-15.2 16.6-6.6-7.1"
                ></path>
              </symbol>
            </svg>
            <input
              id="tmp-28"
              type="checkbox"
              class="promoted-input-checkbox"
              v-model="isTemporary"
            />
            <svg><use xlink:href="#checkmark-28" /></svg>
          </div>
        </div>

        <div class="field-group" v-if="isTemporary">
          <div class="field">
            <label for="fromDate">Data de funcionamento de</label>
            <input type="date" name="fromDate" v-model="selectedFromDate" />
          </div>

          <div class="field">
            <label for="toDate">Data de funcionamento até</label>
            <input type="date" name="toDate" v-model="selectedToDate" />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <h2>Ítens disponíveis</h2>
        </legend>

        <div class="itens-grid" role="list">
          <li
            v-for="typeOfBook in typeOfBooks"
            :key="typeOfBook.id"
            :class="{ selected: selectedTypeOfBooks.includes(typeOfBook.label) }"
            @click="toggleItem(typeOfBook.label)"
            role="listitem"
            tabindex="0"
            @keydown.enter.prevent="toggleItem(typeOfBook.label)"
            @keydown.space.prevent="toggleItem(typeOfBook.label)"
          >
            <img :src="typeOfBook.icon" :alt="typeOfBook.label" />
            <span>{{ typeOfBook.label }}</span>
          </li>
        </div>

        <input type="hidden" name="typeOfBooks" :value="JSON.stringify(selectedTypeOfBooks)" />
      </fieldset>

      <button @click="createForm">Cadastrar ponto de coleta</button>
    </div>
  </div>
</template>

<style scoped>
#page-create-point {
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

.create-point-form {
  background-color: white;

  margin: 80px auto;
  padding: 64px;

  border-radius: 8px;

  max-width: 750px;
}

.create-point-form h1 {
  font-size: 32px;
}

.create-point-form fieldset {
  margin-top: 64px;

  border: 0;
}

.create-point-form legend {
  margin-bottom: 40px;
}

.create-point-form legend h2 {
  font-size: 24px;
}

.create-point-form .field {
  flex: 1;
  display: flex;
  flex-direction: column;

  margin-bottom: 24px;
}

.create-point-form .checkbox-field {
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 24px;
}

.create-point-form .field-group {
  display: flex;
}

.create-point-form input,
.create-point-form select {
  background-color: #92dde0;

  border: 0;
  padding: 16px 24px;
  font-size: 16px;

  border-radius: 8px;

  /* outline: none; */
}

.create-point-form select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.create-point-form label {
  font-size: 14px;
  margin-bottom: 8px;
}

.create-point-form .field-group .field + .field {
  margin-left: 24px;
}

.create-point-form button {
  width: 260px;
  height: 56px;

  background-color: var(--primary-color);
  border-radius: 8px;

  color: var(--title-color);
  font-weight: bold;
  font-size: 16px;

  border: 0;

  margin-top: 40px;
  cursor: pointer;

  transition: background-color 400ms;
}

.create-point-form button:hover {
  background-color: #2e76a6;
}

.itens-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.itens-grid li {
  background-color: #fff0d9;
  list-style: none;

  border: 2px solid #fff0d9;
  border-radius: 8px;
  height: 180px;

  padding: 32px 24px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  text-align: center;

  cursor: pointer;
}

.itens-grid li span {
  margin-top: 12px;
  flex: 1;

  display: flex;
  align-items: center;

  color: var(--title-color);
}

.itens-grid li.selected {
  background: #92dde0;
  border: 2px solid #2e76a6;
}

.itens-grid li img {
  max-height: 60px;
}

.itens-grid li img,
.itens-grid li span {
  pointer-events: none;
}

.checkbox-wrapper-28 {
  --size: 25px;
  position: relative;
  margin-bottom: 24px;
}

.checkbox-wrapper-28 *,
.checkbox-wrapper-28 *:before,
.checkbox-wrapper-28 *:after {
  box-sizing: border-box;
}

.checkbox-wrapper-28 .promoted-input-checkbox {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.checkbox-wrapper-28 input:checked ~ svg {
  height: calc(var(--size) * 0.6);
  -webkit-animation: draw-checkbox-28 ease-in-out 0.2s forwards;
  animation: draw-checkbox-28 ease-in-out 0.2s forwards;
}
.checkbox-wrapper-28 label:active::after {
  background-color: #e6e6e6;
}
.checkbox-wrapper-28 label {
  color: #000;
  line-height: var(--size);
  cursor: pointer;
  position: relative;
}
.checkbox-wrapper-28 label:after {
  content: '';
  height: var(--size);
  width: var(--size);
  margin-right: 8px;
  float: left;
  border: 2px solid var(--primary-color);
  background-color: var(--primary-color);
  border-radius: 3px;
  transition: 0.15s all ease-out;
}
.checkbox-wrapper-28 svg {
  stroke: #0080d3;
  stroke-width: 3px;
  height: 0;
  width: calc(var(--size) * 0.6);
  position: absolute;
  left: calc(var(--size) * 0.21);
  top: calc(var(--size) * 0.2);
  stroke-dasharray: 33;
}

@-webkit-keyframes draw-checkbox-28 {
  0% {
    stroke-dashoffset: 33;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes draw-checkbox-28 {
  0% {
    stroke-dashoffset: 33;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
