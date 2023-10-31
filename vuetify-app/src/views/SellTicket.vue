<template>
  <div class="content-container">
    <v-sheet
      class="blur-sheet"
      min-height="60vh"
      rounded="lg"
      elevation="3"
    >
      <div class="d-flex align-center justify-center mt-13">
        <h1>Sell ticket</h1>
      </div>
      <v-form @submit.prevent="sellTicket">
      <div class="d-flex align-center justify-center mt-6">
        <v-checkbox class="d-flex align-center justify-center" v-model="isChild" label="Passenger is a child?" @change="handleCheckboxChange('isChild')" ></v-checkbox>
        <v-checkbox class="d-flex align-center justify-center" v-model="isPensioner" label="Passenger is a pensioner?" @change="handleCheckboxChange('isPensioner')" ></v-checkbox>
      </div>
        <div class="d-flex align-center justify-center mt-8">
          <h1>Ticket price: {{ ticketPrice }}</h1>
        </div>

        <v-row class="text-center mt-2">
          <v-col>
        <v-btn size="x-large" class="button" type="submit" rounded="xl" elevation="8"
               variant="outlined">
          Sell
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
import { ref, watch, onMounted  } from 'vue';
import { useTicketStore } from '@/store/ticket';
import { useRouter } from 'vue-router';

const ticketPrice = ref(parseFloat(process.env.VUE_APP_TICKET_PRICE || '0'));
const ticketPriceChild = parseFloat(process.env.VUE_APP_TICKET_PRICE_CHILD || '0');
const ticketPricePensioner = parseFloat(process.env.VUE_APP_TICKET_PRICE_PENSIONER || '0');

const isChild = ref(false);
const isPensioner = ref(false);
const ticketStore = useTicketStore();
const successSnackbar = ref(false);
const router = useRouter();

const checkRole = async () => {
  try {
    const response = await ticketStore.getSell();
  } catch (error) {
    await router.push('/error?param1=' + error);
  }
}

watch([isChild, isPensioner], ([isChildValue, isPensionerValue]) => {
  if (isChildValue) {
    ticketPrice.value = ticketPriceChild;
  } else if (isPensionerValue) {
    ticketPrice.value = ticketPricePensioner;
  } else {
    ticketPrice.value = parseFloat(process.env.VUE_APP_TICKET_PRICE || '0');
  }
});

const sellTicket = async () => {
  const isChildValue = isChild.value ? 1 : 0;
  const isPensionerValue = isPensioner.value ? 1 : 0;

  const { error } = await ticketStore.sellTicket(ticketPrice.value, isChildValue, isPensionerValue);
  if (error) {
    console.error(error);
  } else {
    successSnackbar.value = true;
  }
};

const handleCheckboxChange = (checkbox: string) => {
  if (checkbox === 'isChild' && isChild.value) {
    isPensioner.value = false;
  } else if (checkbox === 'isPensioner' && isPensioner.value) {
    isChild.value = false;
  }
};

onMounted(() => {
  checkRole();
});

</script>

<style scoped>
@import '../assets/animations.css';
@import '../assets/general.css';

.content-container {
  animation: fade-in 0.5s;
}

</style>
