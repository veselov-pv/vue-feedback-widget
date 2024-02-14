<template>
  <h2>Please fill out the form</h2>

  <form @submit.prevent="submitForm">
    <div class="p-fluid">
      <div class="p-field">
        <label for="name">Name</label>
        <InputText id="name" v-model="form.name" />
        <div v-if="v.name.$error" class="p-error">Name is required.</div>
      </div>

      <div class="p-field">
        <label for="email">Email</label>
        <InputText id="email" v-model="form.email" type="email" />
        <div v-if="v.email.$error">
          <div v-if="v.email.required.$invalid" class="p-error">
            Email is required.
          </div>
          <div v-if="v.email.email.$invalid" class="p-error">
            Email should be valid.
          </div>
        </div>
      </div>

      <div class="p-field">
        <label for="phone">Phone</label>
        <InputMask
          id="phone"
          v-model="form.phone"
          type="tel"
          :mask="phoneMask"
          :placeholder="phoneMask"
          :autoClear="false"
          :unmask="true"
        />
        <div v-if="v.phone.$error">
          <div v-if="v.phone.required.$invalid" class="p-error">
            Phone is required.
          </div>
          <div
            v-if="v.phone.minLength.$invalid || v.phone.maxLength.$invalid"
            class="p-error"
          >
            Phone should be valid.
          </div>
        </div>
      </div>

      <div class="p-field">
        <label for="rating">Product rating</label>
        <InputNumber
          id="rating"
          v-model="form.rating"
          :min="1"
          :aria-multiselectable="5"
        />
        <div v-if="v.rating.$error">
          <div v-if="v.rating.required.$invalid" class="p-error">
            Rating is required.
          </div>
          <div
            v-if="v.rating.minValue.$invalid || v.rating.maxValue.$invalid"
            class="p-error"
          >
            Rating must be between 1 and 5.
          </div>
        </div>
      </div>

      <div class="p-field">
        <label for="review">Review</label>
        <InputTextarea id="review" v-model="form.review" rows="5" />
        <div v-if="v.review.$error" class="p-error">Review is required.</div>
      </div>

      <Button class="submit-btn" type="submit" label="Send Review" />
    </div>
  </form>
</template>



<script>
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minValue,
  maxValue,
  email,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import {db} from '@/firebase';

export default {
  setup() {
    const form = reactive({
      name: "",
      email: "",
      phone: "",
      rating: null,
      review: "",
    });

    const phoneMask = "(999) 999-9999";

    const rules = computed(() => ({
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      rating: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(5),
      },
      review: {
        required,
      },
    }));

    const v = useVuelidate(rules, form);

    const submitForm = () => {
      v.value
        .$validate()
        .then((res) => {
          if (res) {
            console.log("Form submitted.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return { form, v, submitForm, phoneMask };
  },
};
</script>

<style scoped>
.p-field {
  margin-bottom: 20px;
}

.submit-btn {
  background-color: green;
}
</style>