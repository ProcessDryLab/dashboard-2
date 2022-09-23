<template>
	<b-modal centered id="new-mining-modal" title="New Mining Instance">
		<table class="table table-borderless text-center" style="font-size: 0.85rem">
			<tr>
				<td class="text-nowrap rounded" :class="wizardStep == 1 ? 'bg-warning' : 'text-muted'">1. Miner</td>
				<td class="text-nowrap rounded" :class="wizardStep == 2 ? 'bg-warning' : 'text-muted'">2. Inputs</td>
				<td class="text-nowrap rounded" :class="wizardStep == 3 ? 'bg-warning' : 'text-muted'">
					3. Parameters
				</td>
				<td class="text-nowrap rounded" :class="wizardStep == 4 ? 'bg-warning' : 'text-muted'">
					4. Repository
				</td>
			</tr>
		</table>
		<hr />
		<form ref="form" @submit.stop.prevent="">
			<div v-if="wizardStep == 1">
				<p>Select the mining algorithm to use:</p>
				<b-form-group class="mt-3">
					<MinersDropdown :current="this.miner" @selected="(m) => (this.miner = m)" />
					<b-form-invalid-feedback :state="miner.id !== ''">
						A miner has to be selected
					</b-form-invalid-feedback>
				</b-form-group>
			</div>
			<div v-if="wizardStep == 2">
				<p v-if="Object.keys(miner.input).length == 0">
					<em>The miner selected does not require any input.</em>
				</p>
				<div v-else>
					<p>Configure the input for the mining algorithm:</p>
					<b-form-group class="mt-3" :label="name" v-bind:key="name" v-for="(obj, name) in miner.input">
						<ResourceDropdown :type="obj.name" />
					</b-form-group>
				</div>
			</div>
			<div v-if="wizardStep == 3">
				<h6>Select Parameters</h6>
			</div>
			<div v-if="wizardStep == 4">
				<b-form-group label="Select Destination Repository">
					<b-form-select v-model="repository" :options="repositories" required></b-form-select>
				</b-form-group>
			</div>
		</form>
		<template #modal-footer>
			<div class="w-100">
				<b-button variant="outline-secondary" class="float-left" v-if="wizardStep > 1" @click="wizardStep--">
					Previous
				</b-button>
				<b-button variant="primary" class="float-right" v-if="wizardStep < 4" @click="wizardStep++">
					Next
				</b-button>
				<b-button variant="primary" class="float-right" v-if="wizardStep == 4" @click="wizardStep++">
					Ok
				</b-button>
			</div>
		</template>
	</b-modal>
</template>

<script>
import MinersDropdown from "../widgets/MinersDropdown.vue";
import ResourceDropdown from "../widgets/ResourceDropdown.vue";

export default {
	name: "NewMinerInstance",
	components: { MinersDropdown, ResourceDropdown },
	data() {
		return {
			wizardStep: 1,
			miner: {
				id: "",
				name: "",
				host: "",
				input: {},
			},
			repository: "",
		};
	},
	computed: {
		repositories() {
			return this.$store.getters.getHostsRepository.map((str) => ({
				text: str.name,
				value: str.name,
			}));
		},
	},
};
</script>

<style scoped></style>
