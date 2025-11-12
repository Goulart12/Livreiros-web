<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showModal = ref(false)
const searchCity = ref('')

const goToCreateStore = () => {
  router.push('/create')
}

const goToResults = () => {
  router.push({ name: 'result', query: { city: searchCity.value } })
}
</script>

<template>
  <div id="page-home">
    <div class="home-content">
      <header class="home-header">
        <img src="../assets/logo.svg" alt="logomarca" />
        <a @click="goToCreateStore">
          <span></span>
          Cadastre um ponto de venda/doação
        </a>
      </header>

      <div class="home-main">
        <div class="home-main-text">
          <h1>Seu marketplace para localização de sebos e doações de livros.</h1>

          <p>
            Ajudamos pessoas a encontrarem sebos e locais de doação de livros de forma eficiente.
          </p>

          <a @click="showModal = true">
            <span></span><strong>Pesquisar pontos de vendas/doações</strong>
          </a>
        </div>

        <img src="../assets/background-home.svg" alt="Livros" />
      </div>
    </div>
  </div>

  <modal id="modal" v-show="showModal">
    <div class="modal-content">
      <div class="modal-header">
        <h1>Pontos de Vendas</h1>
        <button @click="showModal = false"><img src="../assets/x.svg" alt="" /></button>
      </div>
      <form class="modal-form" action="search-results.html">
        <label for="search">Cidade</label>
        <div class="search field">
          <input type="text" name="search" v-model="searchCity" placeholder="Pesquise por cidade" />
          <button type="button" @click="goToResults">
            <img src="../assets/search.svg" alt="Buscar" />
          </button>
        </div>
      </form>
    </div>
  </modal>
</template>

<style scoped>
#page-home {
  height: 100vh;
}

.home-content {
  width: 90%;
  max-width: 1250px;
  height: 100%;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
}

.home-header {
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-header img {
  height: 50px;
  width: 180px;
  margin-left: -30px;
}

.home-header a {
  display: flex;
  cursor: pointer;

  color: var(--title-color);
  font-weight: 700;
}

.home-header a span {
  margin-right: 16px;
  display: flex;

  background-image: url(../assets/log-in.svg);

  width: 20px;
  height: 20px;
}

.home-main {
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 48px;
}

.home-main-text {
  max-width: 560px;

  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-main-text h1 {
  font-size: 54px;
}

.home-main-text p {
  font-size: 24px;
  line-height: 38px;
  margin-top: 24px;
}

.home-main-text a {
  width: 100%;
  max-width: 360px;
  height: 72px;
  border-radius: 8px;

  display: flex;
  align-items: center;

  cursor: pointer;

  margin-top: 40px;

  background: #92dde0;

  transition: 400ms;
}

.home-main-text a:hover {
  background-color: #2e76a6;
}

.home-main-text a span {
  width: 72px;
  height: 72px;

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  background-color: rgba(0, 0, 0, 0.08);

  display: flex;
  align-items: center;
  justify-content: center;
}

.home-main-text a span::after {
  content: '';
  background-image: url(../assets/search.svg);

  width: 20px;
  height: 20px;
}

.home-main-text a strong {
  flex: 1;
  color: var(--title-color);
  text-align: center;
}

#modal {
  background-color: #0e0a14ef;
  height: 100%;
  width: 100%;

  position: fixed;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 400ms;
}

.modal-content {
  color: white;

  width: 420px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 48px;
}

.modal-header button {
  width: 20px;
  height: 20px;
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.01px;
}

.modal-header h1 {
  color: white;

  font-size: 36px;
  line-height: 42px;
}

.modal-form label {
  font-size: 14px;
  line-height: 16px;

  display: block;
  margin-bottom: 8px;
}

.modal-form .field {
  display: flex;
}

.modal-form input {
  flex: 1;
  background-color: #f0f0f5;

  border-radius: 8px 0 0 8px;
  border: 0;

  padding: 16px 24px;

  font-size: 16px;
  color: #6c6c80;
}

.modal-form button {
  width: 72px;
  height: 72px;

  cursor: pointer;

  background-color: var(--primary-color);

  border: 0;
  border-radius: 0 8px 8px 0;
}

.modal-form button:hover {
  background-color: #2e76a6;
}
</style>
