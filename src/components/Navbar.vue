<template>
	<b-navbar toggleable="lg" type="dark" class="shadow fixed-top" style="background-color: #900 !important">
		<b-navbar-brand href="#">
			<img src="@/assets/dtu.png" class="d-inline-block align-top" alt="DTU" height="30" />
			PDL - ProcessDryLab
		</b-navbar-brand>
		<b-navbar-toggle target="nav-collapse" is-nav></b-navbar-toggle>
		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="ml-auto">
				<b-nav-item v-b-toggle.sidebar-1>Hosts configuration</b-nav-item>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	name: "Navbar",
};
</script>
