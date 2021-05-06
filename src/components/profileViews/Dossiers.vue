<template>
  <div class="view">
    <div class="tabsHeader">
      <p class="title">Dossiers</p>
      <div class="tabs">
        <div
          @click="switchTab(tab.value)"
          v-for="tab in tabs"
          :key="tab.value"
          class="tabItem"
          :class="{ actv: tab.value == activeTab }"
        >
          <p>{{ tab.label }}</p>
        </div>
      </div>
      <!-- <b-tabs v-model="activeTab" type="is-toggle">
        <b-tab-item label="Contestations"></b-tab-item>
        <b-tab-item label="Remises"></b-tab-item>
        <b-tab-item label="Sollicitations"></b-tab-item>
        <b-tab-item label="Subventions"></b-tab-item>
      </b-tabs> -->
    </div>
    <p v-if="currentCollection.length == 0">Pas de dossier en cours</p>
    <div v-if="currentCollection.length > 0" class="dossiers">
      <div
        v-for="dossier in currentCollection"
        :key="dossier.id"
        class="dossier"
      >
        <div class="cardCont">
          <p class="recapItem">
            Numero du PV : <span class="recapVal">{{ dossier.numero_pv }}</span>
          </p>
          <p class="recapItem">
            Nom : <span class="recapVal">{{ dossier.nom_carte_grise }}</span>
          </p>
          <p class="recapItem">
            Date d'avis :
            <span class="recapVal">{{
              new Date(dossier.date_avis.seconds * 1000)
                | dateFormat("DD/MM/YY")
            }}</span>
          </p>
          <p class="recapItem">
            Numero d'immatriculation :
            <span class="recapVal">{{ dossier.immatriculation }}</span>
          </p>
          <p class="recapItem">
            Numero de permis :
            <span class="recapVal">{{ dossier.numero_permis }}</span>
          </p>
          <p class="recapItem">
            Date de permis :
            <span class="recapVal">{{
              new Date(dossier.date_permis.seconds * 1000)
                | dateFormat("DD/MM/YY")
            }}</span>
          </p>
          <p class="recapItem">
            Nombre de points :
            <span class="recapVal">{{ dossier.nbr_points }}</span>
          </p>
          <p class="recapItem">
            Montant :
            <span class="recapVal">{{ dossier.montant_amende }} €</span>
          </p>
          <!-- <p class="recapItem">
          Scan du PV : <span class="recapVal">{{ dossier.scan.name }}</span>
            </p> -->
        </div>

        <div class="btn">
          <!-- <Badge :status="dossier.status" :requires_consi="false" /> -->
          <Badge :createdAt="dossier.createdAt" />
          <Badge
            v-if="dossier.requires_consignation"
            :status="dossier.status"
            :consi_paid="dossier.consignation_paid"
            :requires_consi="dossier.requires_consignation"
          />
          <!-- <div v-else></div> -->
          <button
            @click="openDoc(dossier.id)"
            class="button is-large is-primary signoutBtn"
          >
            <p>Consulter</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
import Badge from "@/components/Badge.vue";
// import { statuses } from '../../enums';
export default {
  props: {
    callback: { type: Function },
  },
  components: {
    Badge,
  },
  data() {
    return {
      all: [],
      toAccept: [],
      paid: [],
      finished: [],
      activeTab: 0,
      tabs: [
        {
          label: "A accepter",
          value: 0,
        },
        {
          label: "Payés",
          value: 1,
        },
        {
          label: "Terminé",
          value: 2,
        },
        {
          label: "Toutes",
          value: 3,
        },
      ],
    };
  },
  computed: {
    currentCollection() {
      switch (this.activeTab) {
        case 0:
          return this.toAccept;
        case 1:
          return this.paid;
        case 2:
          return this.finished;
        case 3:
          return this.all;
        default:
          return this.all;
      }
    },
  },
  mounted() {
    // this.getUserDossiers();
  },
  methods: {
    switchTab(i) {
      this.activeTab = i;
    },
    openDoc(id) {
      console.log(id);
      // this.callback(id);
      this.$router.push({
        name: "Details",
        params: { id: id },
      });
    },
  },
  firestore: {
    all: db.collection("contestations").orderBy("createdAt"),
    toAccept: db
      .collection("contestations")
      .where("status", "==", "CLIENT_SUBMITTED")
      .orderBy("createdAt"),
    paid: db
      .collection("contestations")
      .where("status", "==", "PAID")
      .orderBy("createdAt"),
    finished: db
      .collection("contestations")
      .where("status", "==", "DEMARCHE_FAITE")
      .orderBy("createdAt"),
  },
};
</script>

<style lang="scss" scoped>
@import "../../variables.scss";

.view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
.tabsHeader {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  .tabs {
    .tabItem {
      padding: 10px;
      margin-left: 5px;
      margin-right: 5px;
      border-radius: 10px;
      font-weight: bold;
      transition: all 200ms;
      &:hover {
        background-color: $veryLight;
      }
      &.actv {
        background-color: $light;
        color: white;
      }
    }
  }
}
.dossiers {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  .dossier {
    // background-color: #f0f0f0;
    background-color: $veryLight;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    border-radius: 20px;
    padding: 20px;
    width: 100%;
    margin-bottom: 20px;
    box-shadow: $shadow;
    .btn {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
    }
    .cardCont {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .recapItem {
      font-weight: 900;
      span {
        font-weight: 400;
      }
    }
  }
}
</style>