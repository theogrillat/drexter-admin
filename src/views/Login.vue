<template>
  <div class="hero is-fullheight">
    <!-- <button @click="goBack" class="delete is-large closebtn"></button> -->
    <div class="hero-body">
      <div class="leftbanner">
        <div class="content">
          <img class="logo" src="../assets/logo.png" alt="logo" />
          <div class="foot">
            <p class="title">Bienvenue !</p>
            <Sep :paddingT="25" :paddingB="25" />
            <p class="catchphrase">Encore quelques informations</p>
          </div>
        </div>
      </div>
      <div class="form-w">
        <div class="form-cont">
          <!-- <img class="logo-login" src="../assets/logo-oom.png" alt="Logo" /> -->
          <transition name="component-fade" mode="out-in">
            <div key="0" v-if="isSignIn" class="title-w">
              <p class="title is-4">Se Connecter</p>
              <p class="sub">Ravis de vous revoir !</p>
            </div>
            <!-- <div key="01" v-else class="title-w">
              <p class="title is-4">Créer un compte</p>
              <p class="sub">Enchanté !</p>
            </div> -->
          </transition>
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <form key="0" v-if="isSignIn" action="#" @submit.prevent="submit">
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

            <input
              placeholder="Mot de passe"
              id="password"
              type="password"
              class="input is-large"
              name="password"
              required
              v-model="form.password"
            />

            <button
              id="submitbtn"
              type="submit"
              class="button is-large is-primary is-fullwidth"
              v-bind:class="{ 'is-loading': loading }"
            >
              <p>Se connecter</p>
            </button>
          </form>
        </div>
        <!-- <div class="toggle">
          <p v-if="isSignIn" @click="toggleMethod()" class="link">
            Creer un compte
          </p>
          <p v-else @click="toggleMethod()" class="link">Se connecter</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { firebase, db } from "../firebase";
import store from "../store";
import Sep from "../components/Sep";

export default {
  components: {
    Sep,
  },
  data() {
    return {
      connexionMethod: "signIn",
      form: {
        email: "",
        password: "",
        passwordConf: "",
      },
      error: null,
      loading: false,
    };
  },
  computed: {
    isSignIn() {
      if (this.connexionMethod == "signIn") {
        return true;
      } else {
        return false;
      }
    },
    isSignUp() {
      if (this.connexionMethod == "signUp") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    goBack() {
      this.$router.replace('/');
    },
    toggleMethod() {
      if (this.connexionMethod == "signIn") {
        this.connexionMethod = "signUp";
      } else {
        this.connexionMethod = "signIn";
      }
      console.log(this.connexionMethod);
    },
    submit() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((usercreds) => {
          const user = usercreds.user;
          if (user.uid == "yv4FRrgKX6N5DdyhZxqVFa24qyY2") {
            store.commit("setUserUid", user.uid);
            db.doc(`users/${user.uid}`)
              .set(
                {
                  lastActivity: firebase.firestore.Timestamp.fromDate(
                    new Date()
                  ),
                },
                { merge: true }
              )
              .then((doc) => {
                console.log(doc);
                setTimeout(() => {
                  this.loading = false;
                  this.$router.replace({ path: "/" });
                }, 500);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            this.loading = false;
            this.error = "Mauvais email/mot de passe";
          }
        })
        .catch((err) => {
          this.loading = false;
          this.error = err.message;
        });
    },
    register() {
      this.loading = true;
      if (this.form.password == this.form.passwordConf) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((usercreds) => {
            const user = usercreds.user;
            store.commit("setUserUid", user.uid);
            db.doc(`users/${user.uid}`)
              .set(
                {
                  email: user.email,
                  lastActivity: firebase.firestore.Timestamp.fromDate(
                    new Date()
                  ),
                  uid: user.uid,
                },
                { merge: true }
              )
              .then((doc) => {
                console.log(doc);
                setTimeout(() => {
                  this.loading = false;
                  this.$router.replace({ path: "/profile" });
                }, 500);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((err) => {
            this.loading = false;
            this.error = err.message;
            console.log(err);
            if (err.code == "auth/email-already-in-use") {
              this.toggleMethod();
              this.form.password = "";
              this.form.passwordConf = "";
              this.error =
                "Un compte existe deja sous cette adresse mail, essayez de vous connecter";
            }
          });
      } else {
        this.loading = false;
        this.error = "Les mot de passes de correspondent pas";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

.hero-body {
  display: flex;
  flex-direction: row;
  padding: 0px;
  background-color: $warmWhite;
  .leftbanner {
    width: 600px;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/drexter-f23c0.appspot.com/o/banner-squashed.jpg?alt=media&token=f333d561-217a-4019-9127-e4f6f31ad8e4");
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      width: 100%;
      padding: 70px;
      background-color: rgba($color: #000000, $alpha: 0.4);
      img.logo {
        width: 300px;
      }
      .foot {
        p.title {
          font-family: Montserrat;
          font-style: normal;
          font-weight: bold;
          font-size: 50px;
          line-height: 61px;
          text-align: center;
          letter-spacing: 0.2px;
          color: #ffffff;
          text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          margin: 0;
        }
        p.catchphrase {
          color: white;
        }
      }
    }
  }
}

.title-w {
  margin-bottom: 20px;
  p.title {
    margin: 0;
  }
}
.form-w {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .toggle {
    position: absolute;
    bottom: 150px;
    p.link {
      text-decoration: underline;
      &:hover {
        font-weight: 500;
      }
    }
  }
  .form-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
  }
}
.container-sub {
  margin-bottom: 20px;
}
.closebtn {
  z-index: 999;
  position: absolute;
  top: 30px;
  right: 30px;
}
</style>