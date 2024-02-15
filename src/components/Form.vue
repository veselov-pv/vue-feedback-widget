<template>
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

      <Button
        class="submit-btn"
        type="submit"
        label="Send Review"
        :loading="loading"
      />
    </div>
  </form>
</template>



<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minValue,
  maxValue,
  email,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputTextarea from "primevue/textarea";
import Button from "primevue/button";

export default {
  components: {
    InputText,
    InputMask,
    InputNumber,
    InputTextarea,
    Button,
  },

  setup() {
    const store = useStore();
    const loading = ref(false);
    const form = reactive({});
    initForm();

    const phoneMask = "(999) 999-9999";

    /**
     * Set of validation rules
     */
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

    /**
     * Initializes the form with the initial values.
     *
     */
    function initForm() {
      Object.assign(form, {
        name: "",
        email: "",
        phone: "",
        rating: 5,
        review: "",
      });
    }
    /**
     * Submits the form after validating the inputs.
     *
     */
    const submitForm = async () => {
      const valid = await v.value.$validate();

      if (!valid) {
        console.log("Form not valid.");
        return;
      }

      console.log("Form is valid.");

      pushToDatabase();
    };

    /**
     * Sets the loading value.
     *
     * @param {any} value - the new value for loading
     * @return {void}
     */
    const setLoading = (value) => {
      loading.value = value;
    };

    /**
     * A function that pushes the form data to the database and handles loading and error states.
     *
     */
    const pushToDatabase = async () => {
      try {
        setLoading(true);
        await setDoc(doc(db, "reviews", form.email), form);
        console.log("Form submitted to database.");
        store.commit("messages/addSuccessMessage", {
          content: "Form submitted successfully!",
        });
        initForm();
        v.value.$reset();
      } catch (error) {
        console.error("Problem with database submission:", error);
        store.commit("messages/addErrorMessage", {
          content: "Problem with database submission",
        });
        throw error;
      } finally {
        setLoading(false);
      }
    };

    return { form, v, submitForm, phoneMask, loading };
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