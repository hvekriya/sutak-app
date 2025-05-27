<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-xl">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Sutak Calculator</h1>
      <form @submit.prevent="calculateSutak" class="space-y-4">
        <div>
          <label class="block font-medium mb-1 text-gray-700">Gender:</label>
          <div class="flex items-center space-x-4">
            <label class="inline-flex items-center">
              <input type="radio" value="boy" v-model="form.gender" class="form-radio" />
              <span class="ml-2">Boy</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" value="girl" v-model="form.gender" class="form-radio" />
              <span class="ml-2">Girl</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block font-medium mb-1 text-gray-700">Married:</label>
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="form.married" class="form-checkbox" />
            <span class="ml-2">Yes</span>
          </label>
        </div>

        <div>
          <label class="block font-medium mb-1 text-gray-700">Deceased Relation:</label>
          <select v-model="form.relationSide" class="w-full border rounded px-3 py-2">
            <option disabled value="">-- select --</option>
            <option value="mother">Mother's Side</option>
            <option value="father">Father's Side</option>
          </select>
        </div>

        <div v-if="form.relationSide === 'father'">
          <label class="block font-medium mb-1 text-gray-700">Relationship:</label>
          <input v-model="form.fatherRelation" placeholder="e.g., Father's brother"
                 class="w-full border rounded px-3 py-2" />
        </div>

        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Calculate
        </button>
      </form>

      <div v-if="sutakDays !== null" class="mt-6 text-center text-lg font-semibold text-green-700">
        Sutak Days: {{ sutakDays }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        gender: '',
        married: false,
        relationSide: '',
        fatherRelation: ''
      },
      sutakDays: null
    }
  },
  methods: {
    calculateSutak() {
      let days = 0

      if (!this.form.gender || !this.form.relationSide) {
        alert('Please complete all required fields.')
        return
      }

      if (this.form.relationSide === 'mother') {
        days = 3
      } else if (this.form.relationSide === 'father') {
        if (this.form.fatherRelation.toLowerCase().includes('father')) {
          days = 10
        } else {
          days = 7
        }
      }

      if (this.form.married) days -= 1
      if (days < 1) days = 1

      this.sutakDays = days
    }
  }
}
</script>