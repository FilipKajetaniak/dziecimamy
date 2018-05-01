<template>
    <div class="admin-options">
        <router-link to="/admin/kontent/opis">
          <div class="admin-option">
            <div class="option-name">Zmień opis strony</div>
          </div>
        </router-link>
        <router-link to="/admin/kontent/zacznijtutaj">
          <div class="admin-option">
            <div class="option-name">Zmień treść "Zacznij tutaj"</div>
          </div>
        </router-link>
        <router-link to="/admin/kontent/omnie">
          <div class="admin-option">
            <div class="option-name">Zmień treść "O mnie"</div>
          </div>
        </router-link>
        <router-link to="/admin/ustawienia">
          <div class="admin-option blue-border">
            <div class="back-to-admin">Wróć</div>
          </div>
        </router-link>
        </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
    }
  }
}
</script>