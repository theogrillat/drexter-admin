<template>
  <div class="details">
    <div class="topBar">
      <div class="titleItem">
        <div @click="goBack()" class="toggleBtn">
          <i class="fas fa-arrow-left fa-2x"></i>
          <p>Retour</p>
        </div>
        <p class="title dossierId">Dossier n°{{ docid }}</p>
      </div>

      <div class="badges">
        <Badge
          v-if="doc.requires_consignation"
          :status="doc.status"
          :consi_paid="doc.consignation_paid"
          :requires_consi="doc.requires_consignation"
        />
        <Badge :status="doc.status" :requires_consi="false" />
      </div>
    </div>
    <div class="details-w">
      <div>
        <!-- <button @click="() => {this.currentStep++}" class="button">add</button> -->
        <div class="timeline">
          <div :class="`actvLine step${currentStep}`"></div>
          <div class="line"></div>
          <div v-for="step in steps" :key="step.index" class="timeline-item">
            <div
              class="marker"
              :class="{
                actv: currentStep == step.index,
                prev: currentStep > step.index,
                next: currentStep < step.index,
              }"
            >
              <i v-if="currentStep > step.index" class="fas fa-check fa-2x"></i>
            </div>
            <p class="label" :class="{ bold: currentStep == step.index }">
              {{ step.label }}
            </p>
          </div>
        </div>
      </div>
      <div class="actions">
        <button
          v-if="docStatus == 0"
          @click="acceptDoc($event)"
          class="button is-large is-primary signoutBtn"
        >
          <p>Accepter</p>
        </button>
        <button
          v-if="docStatus == 0"
          @click="rejectDoc($event)"
          class="button is-large is-light signoutBtn"
        >
          <p>Refuser</p>
        </button>
      </div>
      <div class="infos">
        <div class="cardCont">
          <p class="recapItem">
            Numero du PV : <span class="recapVal">{{ doc.numero_pv }}</span>
          </p>
          <p class="recapItem">
            Nom : <span class="recapVal">{{ doc.nom_carte_grise }}</span>
          </p>
          <p class="recapItem">
            Date d'avis :
            <span class="recapVal">{{
              new Date(doc.date_avis.seconds * 1000) | dateFormat("DD/MM/YY")
            }}</span>
          </p>
          <p class="recapItem">
            Numero d'immatriculation :
            <span class="recapVal">{{ doc.immatriculation }}</span>
          </p>
          <p class="recapItem">
            Numero de permis :
            <span class="recapVal">{{ doc.numero_permis }}</span>
          </p>
          <p class="recapItem">
            Date de permis :
            <span class="recapVal">{{
              new Date(doc.date_permis.seconds * 1000) | dateFormat("DD/MM/YY")
            }}</span>
          </p>
          <p class="recapItem">
            Nombre de points :
            <span class="recapVal">{{ doc.nbr_points }}</span>
          </p>
          <p class="recapItem">
            Montant :
            <span class="recapVal">{{ doc.montant_amende }} €</span>
          </p>
        </div>
        <div class="scan" :class="{ loaded: pdfLoaded }">
          <p>Scan du PV</p>
          <div @click="fullscreenpdf" class="w">
            <pdf :src="doc.scan_url" @page-loaded="pdfLoaded = true"></pdf>
          </div>
        </div>
        <div
          v-if="isFullscreen"
          class="fullscreenPdf"
          :class="{ actv: fsIsActv }"
        >
          <div
            @click="fullscreenpdf"
            class="w"
            :class="{ loaded: fspdfLoaded }"
          >
            <pdf :src="doc.scan_url" @loaded="isLoaded()"></pdf>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
import { statuses } from "../../enums";
import Badge from "@/components/Badge.vue";
import pdf from "vue-pdf";

export default {
  components: {
    Badge,
    pdf,
  },
  methods: {
    async acceptDoc(e) {
      let el;
      if (e.target.nodeName == "P") {
        el = e.target.parentElement;
      } else {
        el = e.target;
      }
      el.classList.add("is-loading");
      setTimeout(async () => {
        await db
          .doc(`contestations/${this.docid}`)
          .update({ status: "DREXTER_ACCEPTED" });
        el.classList.remove("is-loading");
      }, 500);
    },
    async rejectDoc(e) {
      let el;
      if (e.target.nodeName == "P") {
        el = e.target.parentElement;
      } else {
        el = e.target;
      }
      el.classList.add("is-loading");
      setTimeout(async () => {
        await db
          .doc(`contestations/${this.docid}`)
          .update({ status: "REJECTED" });
        el.classList.remove("is-loading");
      }, 500);
    },
    isLoaded() {
      setTimeout(() => {
        this.fspdfLoaded = true;
      }, 50);
    },
    fullscreenpdf() {
      if (this.isFullscreen) {
        this.fsIsActv = false;
        setTimeout(() => {
          this.isFullscreen = !this.isFullscreen;
        }, 510);
      } else {
        this.isFullscreen = !this.isFullscreen;
        setTimeout(() => {
          this.fsIsActv = true;
        }, 10);
      }
    },
    goBack() {
      this.$router.push({
        name: "Home",
        params: { preActivView: "dossiers" },
      });
    },
    // async getDoc() {
    //   let res = await db.doc(`contestations/${this.docid}`).get();
    //   let data = res.data();
    //   this.currentStep = statuses[data.status] + 1;
    //   this.doc = data;
    // },
  },
  data() {
    return {
      pdfLoaded: false,
      fspdfLoaded: false,
      isFullscreen: false,
      fsIsActv: false,
      doc: {},
      // currentStep: 0,
      steps: [
        {
          index: 0,
          label: "Soumise",
        },
        {
          index: 1,
          label: "Accepté",
        },
        {
          index: 2,
          label: "Payé",
        },
        {
          index: 3,
          label: "En cours",
        },
        {
          index: 4,
          label: "Terminé",
        },
      ],
    };
  },
  mounted() {
    this.getDoc();
  },

  props: {
    docUid: {
      type: String,
      default: "",
      required: false,
    },
  },
  computed: {
    docid() {
      console.log(this.$route.params.id);
      return this.$route.params.id;
      //   return this.docUid;
    },
    docStatus() {
      return statuses[this.doc.status];
    },
    currentStep() {
      return statuses[this.doc.status] + 1;
    },
    statusess() {
      console.log(statuses);
      return statuses;
    },
  },
  firestore() {
    return {
      doc: db.doc(`contestations/${this.docid}`),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../variables.scss";

$itemCount: 5;
$itemWidth: calc(90vw / #{$itemCount} - 60px);
.details {
  padding-top: 114px;
  padding-bottom: 40px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .actions {
    margin-bottom: 30px;
    button {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  .infos {
    margin: auto;
    // margin-top: 50px;
    width: 80vw;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
  }
  .fullscreenPdf {
    z-index: 9999;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transform: scale(1.1);
    transition: all 500ms;
    .w {
      border-radius: 10px;
      overflow: hidden;
      transition: all 500ms;
      opacity: 0;
      cursor: pointer;
      transform: translateY(100px);
      &.loaded {
        // box-shadow: $shadow;
        opacity: 1;
        transform: translateY(0px);
      }
    }
    &.actv {
      opacity: 1;
      transform: scale(1);
    }
  }
  .scan {
    // background-color: red;
    border-radius: 20px;
    padding: 20px;
    width: 30vw;
    opacity: 0;
    transform: translateY(100px);
    box-shadow: $shadow;
    transition: all 600ms;
    .w {
      border-radius: 15px;
      overflow: hidden;
      box-shadow: $shadow;
      cursor: pointer;
      transition: all 500ms;
      &:hover {
        transform: scale(1.04);
      }
    }
    p {
      margin-bottom: 20px;
      text-align: left;
      font-weight: 900;
    }
    &.loaded {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  .dossierId {
    margin-top: 30px;
  }
  .b-steps.is-medium .steps .step-items .step-item .step-marker {
    font-size: 10px;
  }
  .timeline {
    width: 80vw;
    border-radius: 20px;
    box-shadow: $shadow;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 50vw;
    margin: auto;
    // background-color: red;
    padding-top: 42px;
    padding-bottom: 42px;
    margin-top: 60px;
    margin-bottom: 30px;
    .line {
      position: absolute;
      top: 75px;
      height: 4px;
      background-color: $medium;
      left: calc(50% - (#{$itemWidth} * #{$itemCount} - #{$itemWidth}) / 2);
      width: calc(#{$itemWidth} * #{$itemCount} - #{$itemWidth});
    }
    .actvLine {
      z-index: 333;
      position: absolute;
      top: 74px;
      height: 6px;
      background-color: $base;
      left: calc(50% - (#{$itemWidth} * #{$itemCount} - #{$itemWidth}) / 2);
      width: 0px;
      transition: all 600ms;
      &.step1 {
        width: calc(#{$itemWidth} * #{$itemCount - 3} - #{$itemWidth});
      }
      &.step2 {
        width: calc(#{$itemWidth} * #{$itemCount - 2} - #{$itemWidth});
      }
      &.step3 {
        width: calc(#{$itemWidth} * #{$itemCount - 1} - #{$itemWidth});
      }
      &.step4 {
        width: calc(#{$itemWidth} * #{$itemCount} - #{$itemWidth});
      }
    }
    .timeline-item {
      z-index: 999;
      min-width: $itemWidth;
      max-width: $itemWidth;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .label {
        margin-top: 10px;
        font-weight: 500;
        &.bold {
          font-weight: 900;
        }
      }
      .marker {
        z-index: 999;
        height: 70px;
        width: 70px;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        &.actv {
          background-color: $medium;
        }
        &.prev {
          background-color: $base;
        }
        &.next {
          background-color: #e6e6e6;
        }
      }
    }
  }
}
.customMarker {
  height: 20px !important;
  font-size: 10px;
}
.details-w {
  width: 100%;
}

.topBar {
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .titleItem {
    display: flex;
    .title {
      margin: 0px;
      margin-left: 160px;
    }
  }
  .badges {
    display: flex;
    position: fixed;
    right: 30px;
    z-index: 1999;
    * {
      margin-left: 10px;
      height: fit-content;
    }
  }
}

.toggleBtn {
  position: fixed;
  background-color: rgba(216, 216, 216, 0);
  width: fit-content;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 200ms;
  p {
    color: black;
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
  }
  &:hover {
    background-color: rgba(216, 216, 216, 1);
  }
}
.cardCont {
  border-radius: 20px;
  box-shadow: $shadow;
  padding: 30px;
  flex: 1;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .recapItem {
    font-weight: 400;
    padding: 10px;
    font-size: 1.5rem;
    span {
      font-weight: 900;
    }
  }
}
</style>