<template>
  <div class="cont">
    <div class="mail">
      <p class="title">Newsletter</p>
      <p class="sub">Restez informé grace à notre Newsletter</p>
      <div class="input-w">
        <input
          placeholder="Email"
          id="email"
          type="email"
          class="input is-large"
          name="email"
          value
          required
          autofocus
          v-model="form.email"
        />
        <button
          @click="handlerSend"
          class="button is-primary"
          v-bind:class="{ 'is-loading': loading }"
        >
          <span class="icon is-small">
            <i class="fas fa-envelope"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { db, firebase } from "../firebase";
export default {
  methods: {
    handlerSend() {
      this.loading = true;
      db.collection("newsletter")
        .where("mail", "==", this.form.email)
        .get()
        .then((snap) => {
          if (snap.docs.length > 0) {
            console.log(snap);
            this.showToastError("Vous avez déjà renseigné votre mail");
            this.form.email = "";
            this.loading = false;
          } else {
            console.log(snap);
            db.collection("newsletter")
              .add({ mail: this.form.email, type: "general", createdAt: firebase.firestore.FieldValue.serverTimestamp() })
              .then((res) => {
                console.log(res);
                this.showToastSuccess("Votre email à bien été enregistré");
                this.form.email = "";
                this.loading = false;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    },
    showToastError(text) {
      this.$toast.error(text, {
        position: "bottom-center",
        timeout: 6000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: false,
        icon: true,
        rtl: false,
      });
    },
    showToastSuccess(text) {
      this.$toast.success(text, {
        position: "bottom-center",
        timeout: 6000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: false,
        icon: true,
        rtl: false,
      });
    },
  },
  data() {
    return {
      form: {
        email: "",
        err: "",
      },
      loading: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.cont {
  display: flex;
  justify-content: center;
  align-content: center;
  .mail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p.title {
      font-size: 30px;
      font-family: Montserrat;
      font-weight: 700;
      letter-spacing: 0;
      margin: 0;
      color: white;
    }
    .sub {
      text-align: left;
    }
    .input-w {
      display: inline;
      margin-top: 20px;
      width: 500px;
      input {
        border-radius: 15px;
        width: 425px;
        margin-right: 15px;
      }
      button.button {
        height: 60px;
        width: 60px;
      }
    }
  }
}
</style>