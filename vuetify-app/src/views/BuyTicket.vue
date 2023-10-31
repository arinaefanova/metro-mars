<template>
  <div class="content-container">
    <v-sheet
      class="blur-sheet"
      min-height="50vh"
      rounded="lg"
      elevation="3"
    >
      <div class="d-flex align-center justify-center mt-16">
        <h1>Buy ticket</h1>
      </div>
      <v-form @submit.prevent="buyTicket">
        <div class="d-flex align-center justify-center mt-5">
          <h2>Your Ticket price: {{ ticketPrice }}</h2>
        </div>

        <v-row class="text-center mt-6">
          <v-col>
            <v-btn size="x-large" class="button" type="submit" rounded="xl" elevation="8"
                   variant="outlined">
              Buy
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-snackbar class="text-center" v-model="successSnackbar" color="success" multiline timeout="3000" show-close>
        Ticket purchased successfully
      </v-snackbar>

    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { useTicketStore } from '@/store/ticket';
import JSConfetti from 'js-confetti'


const confettiRunning = ref(false)

const jsConfetti = new JSConfetti()

const addConfetti = () => {
  if (confettiRunning.value) {
    return
  }
  confettiRunning.value = true
  jsConfetti.addConfetti({
    emojis: ['🪐', '🛸', '🚀'],
  }).then(() => {
    confettiRunning.value = false
  })
}

const authStore = useAuthStore();
const router = useRouter();
const ticketStore = useTicketStore();
const successSnackbar = ref(false);

const ticketPrice = ref(parseFloat(process.env.VUE_APP_TICKET_PRICE || '0'));
const ticketPriceChild = parseFloat(process.env.VUE_APP_TICKET_PRICE_CHILD || '0');
const ticketPricePensioner = parseFloat(process.env.VUE_APP_TICKET_PRICE_PENSIONER || '0');

let userId = 0;
let childDiscount = 0;
let pensionerDiscount = 0;

const updateTicketPrice = () => {
  if (childDiscount === 1) {
    ticketPrice.value = ticketPriceChild;
  } else if (pensionerDiscount === 1) {
    ticketPrice.value = ticketPricePensioner;
  }
};

watchEffect(() => {
  userId = authStore.user?.id || 0;
  childDiscount = authStore.user?.is_child || 0;
  pensionerDiscount = authStore.user?.is_pensioner || 0;

  updateTicketPrice();
});

const buyTicket = async () => {
  const { error } = await ticketStore.buyTicket(
    ticketPrice.value,
    childDiscount,
    pensionerDiscount,
    userId
  );
  if (error) {
    console.error(error);
  } else {
    successSnackbar.value = true;
    addConfetti();
  }
};
</script>

<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

.content-container {
  animation: fade-in 0.5s;
}

</style>
