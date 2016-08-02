<?php
/**
 * sidebar-shop.php
 * ============================================ *
 */
?>

<?php if ( is_active_sidebar( 'sidebar-shop' ) ): ?>
    <aside class="sidebar sidebar-shop col-md-3 col-sm-12 col-xs-12" role="complementary">
        <?php dynamic_sidebar( 'sidebar-shop' ); ?>
    </aside>
<?php endif;