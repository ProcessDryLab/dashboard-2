<template>
	<b-modal centered id="new-file-modal" title="New file" @ok="handleOk">
		<form ref="form" @submit.stop.prevent="handleSubmit">
			<ValidatedInputText label="File:" error="Upload a file" type="file" v-model="file" />
			<b-form-group label="Repository:">
				<b-form-select v-model="repository" :options="repositories" required></b-form-select>
			</b-form-group>
		</form>
	</b-modal>
</template>

<script>
import ValidatedInputText from "../widgets/ValidatedInputText.vue";

export default {
	name: "FileUploadModal",
	components: {
		ValidatedInputText,
	},
	data: () => ({
		file: "",
		repository: "",
		repositories: [],
	}),
	mounted() {
		console.log(this.$store.getters.getHostsRepository[0].name);
		this.repositories = this.$store.getters.getHostsRepository.map((str) => ({ text: str.name, value: str.name }));
		this.repository = this.repositories[0].value;
	},
	methods: {
		handleSubmit() {
			this.$v.$touch();
			if (this.$v.$anyError) {
				return;
			}
			this.$store.commit("addHost", { type: this.type, host: this.hostname });
			this.$nextTick(() => {
				this.$bvModal.hide("new-host-modal");
			});
		},
		handleOk(bvModalEvt) {
			bvModalEvt.preventDefault();
			this.handleSubmit();
		},
	},
};
</script>
