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
  max-width: 78.125rem;
  height: 100%;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
}

.home-header {
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-header img {
  height: 3.125rem;
  width: 11.25rem;
  margin-left: -1.875rem;
}

.home-header a {
  display: flex;
  cursor: pointer;

  color: var(--title-color);
  font-weight: 700;
}

.home-header a span {
  margin-right: 1rem;
  display: flex;

  background-image: url(../assets/log-in.svg);

  width: 1.25rem;
  height: 1.25rem;
}

.home-main {
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 3rem;
}

.home-main-text {
  max-width: 35rem;

  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-main-text h1 {
  font-size: 3.375rem;
}

.home-main-text p {
  font-size: 1.5rem;
  line-height: 2.375rem;
  margin-top: 1.5rem;
}

.home-main-text a {
  width: 100%;
  max-width: 22.5rem;
  height: 4.5rem;
  border-radius: 0.5rem;

  display: flex;
  align-items: center;

  cursor: pointer;

  margin-top: 2.5rem;

  background: #92dde0;

  transition: 400ms;
}

.home-main-text a:hover {
  background-color: #2e76a6;
}

.home-main-text a span {
  width: 4.5rem;
  height: 4.5rem;

  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;

  background-color: rgba(0, 0, 0, 0.08);

  display: flex;
  align-items: center;
  justify-content: center;
}

.home-main-text a span::after {
  content: '';
  background-image: url(../assets/search.svg);

  width: 1.25rem;
  height: 1.25rem;
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

  width: 26.25rem;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 3rem;
}

.modal-header button {
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.0006rem;
}

.modal-header h1 {
  color: white;

  font-size: 2.25rem;
  line-height: 2.625rem;
}

.modal-form label {
  font-size: 0.875rem;
  line-height: 1rem;

  display: block;
  margin-bottom: 0.5rem;
}

.modal-form .field {
  display: flex;
}

.modal-form input {
  flex: 1;
  background-color: #f0f0f5;

  border-radius: 0.5rem 0 0 0.5rem;
  border: 0;

  padding: 1rem 1.5rem;

  font-size: 1rem;
  color: #6c6c80;
}

.modal-form button {
  width: 4.5rem;
  height: 4.5rem;

  cursor: pointer;

  background-color: var(--primary-color);

  border: 0;
  border-radius: 0 0.5rem 0.5rem 0;
}

.modal-form button:hover {
  background-color: #2e76a6;
}

@media (max-width: 900px) {
  .home-content {
    align-items: center;
    text-align: center;
  }

  .home-header {
    margin-bottom: 3rem;
    align-items: center;
    flex-direction: column;
  }

  .home-header a {
    margin-top: 1.5rem;
  }

  .home-header img {
    margin-left: -1rem;
  }

  .home-main {
    align-items: center;
    flex-direction: column;
  }

  .home-main-text {
    max-width: none;
    align-items: center;
  }

  .home-main-text h1 {
    font-size: 2.5rem;
  }

  .home-main-text p {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  .home-main img {
    display: none;
  }

  .modal-content {
    width: 80%;
  }
}
</style>
