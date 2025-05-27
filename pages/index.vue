<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-xl">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Sutak Calculator</h1>

      <form @submit.prevent="calculateSutak" class="space-y-6">

        <!-- Event Type -->
        <div>
          <label class="block font-medium mb-1 text-gray-700">Event Type:</label>
          <select v-model="form.eventType" @change="resetDependentFields('eventType')" class="w-full border rounded px-3 py-2">
            <option disabled value="">-- select --</option>
            <option value="death">Death (Mrutyu)</option>
            <option value="birth">Birth (Janma)</option>
          </select>
        </div>

        <!-- Event Date -->
        <div>
          <label class="block font-medium mb-1 text-gray-700">Event Date:</label>
          <input
            type="date"
            v-model="form.eventDate"
            class="w-full border rounded px-3 py-2"
            max=""
          />
        </div>

        <!-- Your Gender -->
        <div>
          <label class="block font-medium mb-1 text-gray-700">Your Gender:</label>
          <div class="flex items-center space-x-4">
            <label class="inline-flex items-center">
              <input type="radio" value="male" v-model="form.gender" />
              <span class="ml-2">Male</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" value="female" v-model="form.gender" />
              <span class="ml-2">Female</span>
            </label>
          </div>
        </div>

        <!-- Married -->
        <div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="form.married" />
            <span class="ml-2">Married</span>
          </label>
        </div>

        <!-- Family Side selection only if female & married -->
        <div v-if="form.gender === 'female' && form.married">
          <label class="block font-medium mb-1 text-gray-700">Family Side (Sutak applies to):</label>
          <select v-model="form.familySide" @change="resetDependentFields('familySide')" class="w-full border rounded px-3 py-2">
            <option disabled value="">-- select --</option>
            <option value="husband">Husband's Side</option>
            <option value="own">Your Side</option>
          </select>
        </div>

        <!-- Relation Side: shown for males or females not married or females married but choosing own side -->
        <div v-if="form.eventType === 'death' && (form.gender === 'male' || !form.married || form.familySide === 'own')">
          <label class="block font-medium mb-1 text-gray-700">Deceased Relation Side:</label>
          <select v-model="form.relationSide" @change="resetDependentFields('relationSide')" class="w-full border rounded px-3 py-2">
            <option disabled value="">-- select --</option>
            <option value="mother">Mother's Side</option>
            <option value="father">Father's Side</option>
          </select>
        </div>

        <!-- For female married, familySide=husband, ask relation side for husband’s side -->
        <div v-if="form.eventType === 'death' && form.gender === 'female' && form.married && form.familySide === 'husband'">
          <label class="block font-medium mb-1 text-gray-700">Deceased Relation Side (Husband's side):</label>
          <select v-model="form.relationSide" @change="resetDependentFields('relationSide')" class="w-full border rounded px-3 py-2">
            <option disabled value="">-- select --</option>
            <option value="mother">Mother's Side</option>
            <option value="father">Father's Side</option>
          </select>
        </div>

        <!-- Father Relation Input -->
        <div v-if="form.eventType === 'death' && form.relationSide === 'father'">
          <label class="block font-medium mb-1 text-gray-700">Relationship (e.g., Father, Father's Brother):</label>
          <input
            v-model="form.fatherRelation"
            class="w-full border rounded px-3 py-2"
            placeholder="e.g., Father, Father's Brother"
          />
        </div>

        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Calculate
        </button>
      </form>

      <div v-if="sutakDays !== null" class="mt-6 text-center text-lg font-semibold text-green-700">
        Sutak Days: {{ sutakDays }}<br />
        <template v-if="sutakEndDate">
          Sutak End Date: <strong>{{ sutakEndDate }}</strong>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        eventType: '',
        eventDate: '',
        gender: '',
        married: false,
        familySide: '',       // only for married females
        relationSide: '',
        fatherRelation: '',
      },
      sutakDays: null,
      sutakEndDate: null,
    };
  },
  watch: {
    'form.eventType'(val) {
      this.resetDependentFields('eventType');
    },
    'form.familySide'(val) {
      this.resetDependentFields('familySide');
    },
    'form.relationSide'(val) {
      this.resetDependentFields('relationSide');
    }
  },
  methods: {
    resetDependentFields(field) {
      if (field === 'eventType') {
        this.form.familySide = '';
        this.form.relationSide = '';
        this.form.fatherRelation = '';
        this.sutakDays = null;
        this.sutakEndDate = null;
      }
      if (field === 'familySide') {
        this.form.relationSide = '';
        this.form.fatherRelation = '';
        this.sutakDays = null;
        this.sutakEndDate = null;
      }
      if (field === 'relationSide') {
        this.form.fatherRelation = '';
        this.sutakDays = null;
        this.sutakEndDate = null;
      }
    },
    calculateSutak() {
      if (!this.form.eventType) {
        alert('Please select the event type.');
        return;
      }
      if (!this.form.eventDate) {
        alert('Please select the event date.');
        return;
      }
      if (!this.form.gender) {
        alert('Please select your gender.');
        return;
      }
      if (this.form.gender === 'female' && this.form.married && !this.form.familySide) {
        alert('Please select the family side.');
        return;
      }
      if (this.form.eventType === 'death' && !this.form.relationSide) {
        alert('Please select deceased relation side.');
        return;
      }
      if (this.form.eventType === 'death' && this.form.relationSide === 'father' && !this.form.fatherRelation.trim()) {
        alert('Please specify the relationship on father’s side.');
        return;
      }

      let days = 0;

      if (this.form.eventType === 'death') {
        // Different rules based on user gender and family side
        if (this.form.gender === 'female' && this.form.married && this.form.familySide === 'husband') {
          // Married female following husband's family side rules
          if (this.form.relationSide === 'mother') {
            days = 3;  // fewer days for mother side (husband's mother)
          } else if (this.form.relationSide === 'father') {
            const rel = this.form.fatherRelation.toLowerCase();
            if (rel.includes('father') || rel.includes('grandfather') || rel.includes('brother')) {
              days = 10;
            } else {
              days = 7;
            }
          }
          // For married females, no -1 day adjustment needed here
        } else {
          // Male or unmarried female or married female choosing own side
          if (this.form.relationSide === 'mother') {
            days = 3;
            if (this.form.gender === 'female' && this.form.married) {
              days = 1; // fewer days for married females on their own mother's side
            }
          } else if (this.form.relationSide === 'father') {
            const rel = this.form.fatherRelation.toLowerCase();
            if (rel.includes('father') || rel.includes('grandfather') || rel.includes('brother')) {
              days = 10;
            } else {
              days = 7;
            }
            if (this.form.gender === 'female' && this.form.married) {
              days = Math.max(days - 1, 1);
            }
          }
        }
      } else if (this.form.eventType === 'birth') {
        // Birth sutak days, simplified
        days = 10;
        if (this.form.gender === 'female' && this.form.married) {
          days = Math.max(days - 2, 1);
        }
      }

      this.sutakDays = days;

      const startDate = new Date(this.form.eventDate);
      if (isNaN(startDate)) {
        this.sutakEndDate = null;
      } else {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days);
        this.sutakEndDate = endDate.toISOString().slice(0, 10);
      }
    }
  }
};
</script>
