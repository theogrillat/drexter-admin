<template>
  <div class="page">
    <div @click="toffle()" class="toggleBtn" :class="{ actv: !folded }">
      <i v-if="folded" class="fas fa-bars fa-2x"></i>
      <i v-else class="fas fa-times fa-2x"></i>
    </div>
    <div class="side-menu" :class="{ actv: folded }">
      <div class="links">
        <div
          @click="display('profile')"
          class="menu-item"
          :class="{ actv: activView == 'profile' }"
        >
          <p>Mon profile</p>
        </div>
        <div
          @click="display('dossiers')"
          class="menu-item"
          :class="{ actv: activView == 'dossiers' }"
        >
          <p>Mes dossiers</p>
        </div>
      </div>
      <button
        @click="signOut()"
        class="button is-large is-primary signoutBtn"
        v-bind:class="{ 'is-loading': loading }"
      >
        <p>Deconnexion</p>
      </button>
    </div>
    <div class="page-content" :class="{ actv: folded }">
      <transition name="component-fade" mode="out-in">
        <!-- TODO: Views -->
        <Account v-if="activView == 'profile'" />
        <Dossiers v-if="activView == 'dossiers'" :callback="goDetails"/>
        <Doc v-if="activView == 'details'" :docUid="actvDoc"/>
      </transition>
    </div>
  </div>
</template>

<script>
// import store from "./store";
import { firebase, db } from "../firebase";
import Account from "@/components/profileViews/Account.vue";
import Dossiers from "@/components/profileViews/Dossiers.vue";
import Doc from "@/components/profileViews/Doc.vue";

export default {
  props: {
    preActivView: { 
      type: String,
      default: "profile",
      required: false
    },
  },
  components: {
    Account,
    Dossiers,
    Doc,
  },
  data() {
    return {
      loading: false,
      user: null,
      activView: this.preActivView,
      contestations: {},
      folded: false,
      actvDoc: '',
    };
  },
  firestore() {
    return {
      user: db.collection("users").doc(this.getUserUid()),
    };
  },
  methods: {
    goDetails(id) {
      this.actvDoc = id;
      this.display('details');
    },
    toffle() {
      this.folded = !this.folded;
    },
    async getUserDossiers() {
      let user = db.collection("users").doc(this.getUserUid()).get();
      let userData = user.data();
      let dossiersList = userData.dossiers;
      if (dossiersList.length > 0) {
        dossiersList.forEach(async (dossierId) => {
          let dossier = db.doc(`contestations/${dossierId}`).get();
          this.contestations[dossierId] = dossier.data();
        });
      }
    },
    display(view) {
      this.activView = view;
    },
    getUserUid() {
      return firebase.auth().currentUser.uid;
    },
    signOut() {
      this.loading = true;
      setTimeout(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            setTimeout(() => {
              this.loading = false;
              this.$router.replace({ path: "/" });
            }, 500);
          });
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";

button.signoutBtn {
  margin: 15px;
  box-shadow: 0px 6px 17px -5px rgba(0, 0, 0, 0.25);
  background-color: #870b18;
}
.toggleBtn {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 30px;
  top: 124px;
  z-index: 999;
  font-size: 14px;
  border-radius: 100px;
  transition: all 600ms;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
  &.actv {
    left: 260px;
    top: 113px;
    color: white;
    transform: rotate(180deg);
    &:hover {
      background-color: #870b18;
    }
  }
}
.side-menu {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding-top: 30px;
  width: 300px;
  height: calc(100vh - 20px - 84px - 10px);
  position: fixed;
  top: 104px;
  left: 10px;
  background-color: $base;
  border-radius: 20px;
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.15);
  transition: all 600ms;
  &.actv {
    left: -310px;
  }
  .menu-item {
    width: 100%;
    height: 60px;
    color: white;
    transition: all 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    p {
      font-size: 16px;
      font-weight: bold;
    }
    &:hover {
      background-color: #870b18;
    }
    &.actv {
      background-color: #870b18;
    }
  }
}
.page-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 40px;
  padding-top: calc(104px + 40px);
  position: absolute;
  top: 0px;
  left: calc(10px + 300px + 10px);
  width: calc(100vw - 10px - 300px - 10px);
  min-height: 100vh;
  transition: all 600ms;
  &.actv {
    left: 0px;
    width: calc(100vw);
    padding-top: calc(104px + 40px + 40px);
  }
}
</style>
