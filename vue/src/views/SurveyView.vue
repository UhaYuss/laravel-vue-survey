<template>
  <PageComposer title="View or create survey">
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ model.id ? model.title : "Create a Survey" }}
        </h1>
      </div>
    </template>
    <form @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

          <!--          Image               -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img v-if="model.image" :alt="model.title" :src="model.image" class="w-64 h-48 object-cover"/>
              <span
                v-else
                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg class="size-6" fill="none" stroke="currentColor" stroke-width="1.5"
                       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
                  </svg>
              </span>
              <button
                class="relative rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                type="button">
                Change
                <input id="" class="absolute left-0 top-0 right-0 bottom-0 w-full h-full opacity-0 cursor-pointer"
                       name="" type="file">
              </button>
            </div>
            <!--          Image               -->
            <!--            Title             -->
            <div class="mt-3 text-sm">
              <label class="block text-sm font-medium text-gray-700" for="title">Title</label>
              <input id="title" v-model="model.title" autocomplete="survey_title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" name="title"
                     type="text">
            </div>
            <!--            Title             -->
            <!--           Description            -->
            <div class="mt-3 text-sm">
              <label for="about" class="block text-sm font-medium text-gray-700">Description</label>
              <div class="mt-1">
                <textarea id="description" rows="3" name="description" v-model="model.description" autocomplete="survey_description" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Describe your survey"/>
              </div>

            </div>
            <!--           Description           -->
            <!--           Expire Date           -->
              <div class="mt-3 text-sm">
                <label for="expiry_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
                <input id="expiry_date" name="expiry_date" type="date" v-model="model.expiry_date" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-64 shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
            <!--           Expire Date           -->
            <!--           Status           -->
            <div class="mt-3 text-sm">
              <div class="flex items-center">
                <input id="status" name="status" type="checkbox" v-model="model.status" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                <label for="status" class="ml-2 block text-sm text-gray-900">
                  Status
                </label>
              </div>
            </div>
            <!--           Status           -->

            <!--           Question      -->
            <div class="py-4 bg-white">
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-semibold">Question</h3>
                <button type="button" @click="addQuestion" class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Question
                </button>
                <div v-if="!model.questions.length" class="text-center text-gray-600">
                  <p>You don't have any question created</p>
                </div>
                <div v-for="(question, index) in model.questions" :key="question.id">
                  <QuestionEditor :question="question" :index="index" @deleteQuestion="deleteQuestion" @change="changeQuestion" @addQuestion="addQuestion"/>

                </div>
              </div>
            </div>


            <!--           Question      -->
            <div class="px-4 py-4 bg-gray-50 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
            </div>
            <!--           Survey Field       -->




          </div>
        </div>
      </div>
    </form>


  </PageComposer>
</template>
<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
import store from "../store/index.js";
import PageComposer from "../components/PageComposer.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";
const route = useRoute();
let model = ref({
  title: "",
  status: false,
  description: null,
  image: null,
  expiry_date: null,
  questions: []
})
if (route.params.id) {
  model.value = store.state.surveys.find(survey => survey.id === parseInt(route.params.id));
}

</script>

<style scoped>

</style>
