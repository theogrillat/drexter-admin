<template>
  <div :class="`badge ${getType(findBadge(status).t)}`">
    <div class="dot"></div>
    <p>{{ findBadge(status).msg }}</p>
  </div>
</template>

<script>
import { statuses } from "../enums";
export default {
  props: {
    createdAt: {
      type: Object,
      default() {
        return {};
      },
      required: false,
    },
    status: {
      type: String,
      default: "",
      required: true,
    },
    consi_paid: {
      type: Boolean,
      default: false,
      required: false,
    },
    requires_consi: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  methods: {
    findTime(ts) {
      const c = ts.toDate();
      const t = new Date();
      const s = Math.floor((t.getTime() - c.getTime()) / 1000 / 60 / 60);
      console.log(s);
      return s;
    },
    getType(t) {
      switch (t) {
        case "p":
          return "pending";
        case "s":
          return "success";
        case "d":
          return "danger";

        default:
          return "danger";
      }
    },
    findBadge(status) {
      const s = statuses[status];
      if (this.requires_consi) {
        switch (this.consi_paid) {
          case true:
            return {
              t: "s",
              msg: `Consignation payée`,
            };
          case false:
            return {
              t: "p",
              msg: `En attente de consignation`,
            };
          default:
            return {
              t: "d",
              msg: `Status inconnu`,
            };
        }
      } else if (this.createdAt) {
        const time = this.findTime(this.createdAt);
        this.isDanger = true;
        if (time < 6) {
          return {
            t: "p",
            msg: `Soumis il y a ${time}h`,
          };
        } else {
          return {
            t: "d",
            msg: `Soumis il y a ${time}h`,
          };
        }
      } else {
        switch (s) {
          case statuses.CLIENT_SUBMITTED:
            return {
              t: "p",
              msg: `En attente d'acceptation de la part de Drexter`,
            };
          case statuses.DREXTER_ACCEPTED:
            return {
              t: "p",
              msg: `En attente de payement`,
            };
          case statuses.PAID:
            return {
              t: "p",
              msg: `Demarches en cours`,
            };
          case statuses.DEMARCHE_FAITE:
            return {
              t: "s",
              msg: `Demarches effectué aupres de l'état`,
            };
          default:
            return {
              t: "d",
              msg: `Status inconnu`,
            };
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.badge {
  .dot {
    height: 10px;
    width: 10px;
    border-radius: 10px;
    margin-right: 15px;
  }
  padding: 15px;
  border-radius: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  &.pending {
    background-color: #ffeccc;
    color: #e69201;
    .dot {
      background-color: #e69201;
    }
  }
  &.danger {
    background-color: #ffe0e0;
    color: #d30000;
    .dot {
      background-color: #d30000;
    }
  }
  &.success {
    background-color: #cdffcd;
    color: #007f00;
    .dot {
      background-color: #007f00;
    }
  }
}
</style>