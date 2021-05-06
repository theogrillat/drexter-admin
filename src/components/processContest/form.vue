<template>
  <div class="form-container">
    <div v-if="!submitted" class="form">
      <form action="#" @submit.prevent="next">
        <transition name="slide-fade" mode="out-in">
          <div key="0" v-if="currentStep == 0" class="input-w">
            <p class="title">Numero de Pv</p>
            <input
              placeholder="N° de PV"
              id="0"
              type="text"
              class="input is-large"
              name="nbrpv"
              value
              required
              autofocus
              v-model="form.numPv"
            />
          </div>
          <div key="1" v-if="currentStep == 1" class="input-w">
            <p class="title">Nom</p>
            <input
              placeholder="Nom"
              id="1"
              type="text"
              class="input is-large"
              name="name"
              value
              required
              autofocus
              v-model="form.nom"
            />
          </div>
          <div key="2" v-if="currentStep == 2" class="input-w">
            <p class="title">Date d'avis</p>
            <div class="dum-input">
              <p>{{ form.dateAvis | dateFormat("DD/MM/YY") }}</p>
            </div>

            <b-datepicker
              class="datepicker"
              v-model="form.dateAvis"
              :inline="true"
              :show-week-number="false"
              locale="fr-FR"
              placeholder="Date"
              icon="calendar-today"
              trap-focus
            >
            </b-datepicker>
          </div>
          <div key="3" v-if="currentStep == 3" class="input-w">
            <p class="title">Numero d'immatriculation</p>
            <input
              placeholder="N° d'immatriculation"
              id="3"
              type="text"
              class="input is-large"
              name="immat"
              value
              required
              autofocus
              v-model="form.immat"
              @input="immatFilter"
            />
          </div>
          <div key="4" v-if="currentStep == 4" class="input-w">
            <p class="title">Numero de permis</p>
            <input
              placeholder="N° de permis"
              id="4"
              type="text"
              class="input is-large"
              name="permi"
              value
              required
              autofocus
              v-model="form.numPermis"
            />
          </div>
          <div key="5" v-if="currentStep == 5" class="input-w">
            <p class="title">Date du permis de conduire</p>
            <div class="dum-input">
              <p>{{ form.datePermis | dateFormat("DD/MM/YY") }}</p>
            </div>

            <b-datepicker
              class="datepicker"
              v-model="form.datePermis"
              :inline="true"
              :show-week-number="false"
              locale="fr-FR"
              placeholder="Date"
              icon="calendar-today"
              trap-focus
            >
            </b-datepicker>
          </div>
          <div key="6" v-if="currentStep == 6" class="input-w">
            <p class="title">Nombre de point retirés</p>
            <input
              placeholder="Nombre de points"
              id="6"
              type="text"
              class="input is-large"
              name="point"
              value
              required
              autofocus
              v-model="form.nbrPoints"
            />
          </div>
          <div key="7" v-if="currentStep == 7" class="input-w">
            <p class="title">Montant de l'amende</p>
            <input
              placeholder="Montant"
              id="7"
              type="number"
              class="input is-large"
              name="montant"
              value
              required
              autofocus
              v-model="form.montant"
            />
          </div>
          <div key="8" v-if="currentStep == 8" class="input-w">
            <p class="title">Scan du PV</p>
            <div v-if="form.scan != null" class="document">
              <p>{{ form.scan.name }}</p>
              <!-- <p>Document.pdf</p> -->
              <div @click="deleteFile" class="deleteBtn">
                <b-icon icon="trash" size="is-small" type="is-danger"> </b-icon>
              </div>
            </div>
            <b-upload v-else v-model="form.scan" class="datepicker" drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"> </b-icon>
                  </p>
                  <p>
                    Déposez votre fichier ici ou cliquez pour uploader votre
                    document
                  </p>
                </div>
              </section>
            </b-upload>
          </div>

          <div key="9" v-if="currentStep == 9" class="input-w">
            <p class="title">Le PV est-il dû à un de ces cas ?</p>
            <div class="radios">
              <b-field>
                <b-radio v-model="form.type" native-value="none">
                  Aucun des cas ci-dessous
                </b-radio>
              </b-field>
              <b-field>
                <b-radio v-model="form.type" native-value="exces">
                  Excès de vitesse
                </b-radio>
              </b-field>
              <b-field>
                <b-radio v-model="form.type" native-value="distance">
                  Non-respect distances de sécurité
                </b-radio>
              </b-field>
              <b-field>
                <b-radio v-model="form.type" native-value="signal">
                  Non-respect de signal imposant un arrêt
                </b-radio>
              </b-field>
              <b-field>
                <b-radio v-model="form.type" native-value="reserve">
                  Circulation sur voie réservée
                </b-radio>
              </b-field>
            </div>
          </div>
          <div key="10" v-if="currentStep == 10" class="input-w">
            <p class="title">Recap</p>
            <p class="recapItem">
              Numero du PV : <span class="recapVal">{{ form.numPv }}</span>
            </p>
            <p class="recapItem">
              Nom : <span class="recapVal">{{ form.nom }}</span>
            </p>
            <p class="recapItem">
              Date d'avis :
              <span class="recapVal">{{
                form.dateAvis | dateFormat("DD/MM/YY")
              }}</span>
            </p>
            <p class="recapItem">
              Numero d'immatriculation :
              <span class="recapVal">{{ form.immat }}</span>
            </p>
            <p class="recapItem">
              Numero de permis :
              <span class="recapVal">{{ form.numPermis }}</span>
            </p>
            <p class="recapItem">
              Date de permis :
              <span class="recapVal">{{
                form.datePermis | dateFormat("DD/MM/YY")
              }}</span>
            </p>
            <p class="recapItem">
              Nombre de points :
              <span class="recapVal">{{ form.nbrPoints }}</span>
            </p>
            <p class="recapItem">
              Montant : <span class="recapVal">{{ form.montant }} €</span>
            </p>
            <p class="recapItem">
              Scan du PV : <span class="recapVal">{{ form.scan.name }}</span>
            </p>
          </div>
        </transition>

        <button
          v-if="currentStep == 0"
          id="submitbtn"
          type="submit"
          class="button is-large is-primary is-fullwidth"
        >
          <p>Suivant</p>
        </button>
        <div v-else class="btnGroup">
          <button
            id="prevbtn"
            @click="prev"
            type="button"
            class="button is-large is-primary is-fullwidth"
          >
            <p>Précédent</p>
          </button>
          <button
            id="submitbtn"
            type="submit"
            class="button is-large is-primary is-fullwidth"
            :class="{ 'is-loading': loading }"
          >
            <p v-if="currentStep == 10">Valider</p>
            <p v-else>Suivant</p>
          </button>
        </div>
      </form>
    </div>
    <div v-else>
      <p class="title">Dossier envoyé !</p>
      <button @click="navToDoc()" class="button is-large is-primary signoutBtn">
        <p>Voir</p>
      </button>
    </div>
  </div>
</template>

<script>
import { submitForm } from "../../services/processContest";
export default {
  methods: {
    navToDoc() {
      this.$router.push({
        name: "Profile",
        params: { preActivView: "dossiers" },
      });
    },
    next() {
      if (this.currentStep == 10) {
        this.loading = true;
        this.submitForm();
      } else {
        console.log("next");
        this.currentStep++;
        console.log(this.currentStep);
        setTimeout(() => {
          document.getElementById(this.currentStep.toString()).focus();
        }, 500);
      }
    },
    async submitForm() {
      console.log("Submit");
      let res = await submitForm(this.form);
      console.log(res);
      if (res.success) {
        this.submitted = true;
      }
    },
    prev() {
      console.log("prev");
      this.currentStep--;
      console.log(this.currentStep);
      setTimeout(() => {
        document.getElementById(this.currentStep.toString()).focus();
      }, 500);
    },
    deleteFile() {
      this.form.scan = null;
    },
    immatFilter() {
      this.form.immat = this.form.immat.toUpperCase();
    },
  },
  data() {
    return {
      currentStep: 0,
      submitted: false,
      loading: false,
      form: {
        numPv: "",
        nom: "",
        dateAvis: new Date(),
        immat: "",
        numPermis: "",
        datePermis: new Date(),
        nbrPoints: "",
        montant: "",
        scan: null,
        consignation: false,
        type: "none",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  input {
    margin-bottom: 20px;
    width: 400px;
    border-radius: 15px;
  }
  p.title {
    font-size: 30px;
    font-family: Montserrat;
    font-weight: 700;
    letter-spacing: 0;
  }
  .dum-input {
    height: 60px;
    width: 100%;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    margin-bottom: 20px;
    p {
      font-size: 1.5rem;
      color: #363636;
      font-weight: bold;
    }
  }
  .radios {
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  .datepicker {
    margin-bottom: 20px;
  }
  .document {
    padding-left: 20px;
    padding-right: 20px;
    height: 60px;
    min-width: 320px;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    margin-bottom: 20px;
    p {
      font-size: 1.5rem;
      color: #363636;
      font-weight: bold;
    }
    .deleteBtn {
      margin-left: 20px;
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 100px;
      &:hover {
        background-color: #dbdbdb;
      }
    }
  }
  .recapItem {
    font-size: 20px;
    text-align: left;
    &:last-child {
      margin-bottom: 20px;
    }
    .recapVal {
      font-weight: bold;
    }
  }

  .btnGroup {
    width: 100%;
    display: flex;
    button:last-child {
      margin-left: 5px;
    }
    button:first-child {
      margin-right: 5px;
    }
  }
}
</style>