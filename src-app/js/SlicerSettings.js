/**
 * WebSlicer
 * Copyright (C) 2021 SynDaver 3D
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

class SlicerSettings {
    static async populate(s) {
        let settings = localStorage.getItem("ui-slicer-settings") || query.slicer_settings || "1st-slice";

        if (settings == "cura-all") {
            await this.populateCuraSettings(s);
        } else {
            if (!SlicerSettings.slicerSettings.hasOwnProperty(settings)) settings = "1st-slice";

            for (const item of SlicerSettings.slicerSettings[settings]) {
                const indent = item.match(/^\s*/)[0].length;
                if(item.startsWith("#")) continue;
                if(item.startsWith("<")) {
                    s.html(item);
                } else if (item.endsWith(":")) {
                    s.category(item.slice(0,-1));
                } else {
                    s.fromSlicer(item.trim(),{},"\t".repeat(indent));
                }
            }
        }
        return settings;
    }

    static async populateCuraSettings(s) {
        function parseChildren(child, label_prefix) {
            for (const [key, value] of Object.entries(child)) {
                s.fromSlicer(key,{},label_prefix);
                if (value.hasOwnProperty("children")) {
                    parseChildren(value.children, label_prefix + "\t");
                }
            }
        }
        const json = await fetchJSON("config/cura_defaults/fdmprinter.def.json");
        for (const [key, value] of Object.entries(json["settings"])) {
            if (key == "machine_settings" || key == "dual" || key == "command_line_settings") continue;
            if (value.type == "category") {
                s.category(value.label);
                parseChildren(value.children, "");
            }
        }
    }
}

SlicerSettings.slicerSettings = {
    /************************** SynDaver3D 1st Slice ***************************/
    "1st-slice" : [
        // My 1st Slice! 'Slicing' refers to the process of taking a 3D file and converting it into a G-code(.gco) file for 3D printing using a slicing software. 
        // Powering this software is a complex bundle of math called a 'Slicing Engine'. The slicing engine we support is the, open source, CURA slicing engine.
        "<div id='first_slice_warn'>The recommended settings for the selected material will be used.<p>To customize, go to &quot;Advanced Features&quot; and change your &quot;User Interface&quot; experience.</div><br>"
    ],

    /***************************** SynDaver Beginner ***************************/
    "beginner" : [
        // Beginner settings list
        "Resolution:",
            "layer_height",
            "layer_height_0",

        "Shell:",
            "wall_line_count",
            "z_seam_type",
            "z_seam_position",
            " z_seam_x",
            " z_seam_y",
            "z_seam_corner",

        "Top/Bottom:",
            "top_layers",
            " bottom_layers",
            " initial_bottom_layers",
            "top_bottom_pattern",
            "top_bottom_pattern_0",
  
        "Infill:",
            "infill_sparse_density",
            "infill_pattern",

        "Material:",
            "build_volume_temperature",
            "material_print_temperature",
            "material_print_temperature_layer_0",
            "material_initial_print_temperature",
            "material_final_print_temperature",
            "material_bed_temperature",
            "material_bed_temperature_layer_0",

        "Speed:",
            "speed_print",
            "speed_travel",
            "speed_layer_0",
            " speed_print_layer_0",
            " speed_travel_layer_0",
            "skirt_brim_speed",

        "Travel:",
            "retraction_enable",
            " retraction_amount",
            " retraction_speed",
            "retraction_combing",

        "Cooling:",
            "cool_fan_enabled",
            "cool_fan_speed",
            " cool_fan_speed_min",
            " cool_fan_speed_max",
            "cool_min_layer_time_fan_speed_max",
            "cool_fan_full_layer",
            "cool_min_layer_time",
            "cool_min_speed",

        "Support:",
            "support_enable",
            "support_extruder_nr",
            "support_structure",
            "support_pattern",
            "support_infill_rate",
            "support_brim_enable",
            "support_z_distance",
            "support_top_distance",
            "support_bottom_distance",
            "support_xy_distance",
            "support_xy_overrides_z",
            "support_xy_distance_overhang",
            "support_interface_enable",
            " support_interface_height",
            " support_interface_skip_height",
            " support_interface_density",
            " support_interface_pattern",

        "Platform Adhesion:",
            "adhesion_type",
            "skirt_line_count",
            "skirt_gap",
            "brim_width",
            " brim_line_count",

        "BlackMagic:",
            "magic_spiralize",
            "smooth_spiralized_contours",
    ],

    /***************************** SynDaver Intermediate ***************************/
    "intermediate" : [
        // Default settings list
        "Machine Settings:",
            "machine_nozzle_size",

        "Resolution:",
            "layer_height",
            "layer_height_0",
            "line_width",
            " wall_line_width",
            "  wall_line_width_0",
            "  wall_line_width_x",
            " skin_line_width",
            " infill_line_width",
            " skirt_brim_line_width",
            " support_line_width",
            " support_interface_line_width",
            "  support_roof_line_width",
            "  support_bottom_line_width",
            "initial_layer_line_width_factor",

        "Shell:",
            "wall_thickness",
            " wall_line_count",
            "wall_0_wipe_dist",
            "wall_0_inset",
            "optimize_wall_printing_order",
            "inset_direction",
            "alternate_extra_perimeter",
            "filter_out_tiny_gaps",
            "fill_outline_gaps",
            "xy_offset",
            "xy_offset_layer_0",
            "hole_xy_offset",
            "z_seam_type",
            "z_seam_position",
            " z_seam_x",
            " z_seam_y",
            "z_seam_corner",
            "z_seam_relative",

        "Top/Bottom:",
            "roofing_layer_count",
            "top_bottom_thickness",
            " top_thickness",
            "  top_layers",
            " bottom_thickness",
            "  bottom_layers",
            "  initial_bottom_layers",
            "top_bottom_pattern",
            "top_bottom_pattern_0",
            "skin_angles",
            "skin_no_small_gaps_heuristic",
            "skin_outline_count",
            "ironing_enabled",
            "ironing_only_highest_layer",
            "ironing_pattern",
            "ironing_line_spacing",
            "ironing_flow",
            "ironing_inset",
            "speed_ironing",
            "skin_overlap",
            " skin_overlap_mm",
            "skin_preshrink",
            " top_skin_preshrink",
            " bottom_skin_preshrink",
            "expand_skins_expand_distance",
            " top_skin_expand_distance",
            " bottom_skin_expand_distance",
            "max_skin_angle_for_expansion",
            " min_skin_width_for_expansion",

        "Infill:",
            "infill_sparse_density",
            " infill_line_distance",
            "infill_pattern",
            "connect_infill_polygons",
            "infill_angles",
            "infill_offset_x",
            "infill_offset_y",
            "infill_randomize_start_location",
            "infill_multiplier",
            "infill_wall_line_count",
            "infill_overlap",
            " infill_overlap_mm",
            "infill_wipe_dist",
            "infill_sparse_thickness",
            "gradual_infill_steps",
            "gradual_infill_step_height",
            "infill_before_walls",
            "min_infill_area",
            "infill_support_enabled",
            "infill_support_angle",
            "skin_edge_support_thickness",
            " skin_edge_support_layers",

        "Material:",
            "default_material_print_temperature",
            "build_volume_temperature",
            "material_print_temperature",
            "material_print_temperature_layer_0",
            "material_initial_print_temperature",
            "material_final_print_temperature",
            "default_material_bed_temperature",
            "material_bed_temperature",
            "material_bed_temperature_layer_0",
            "material_flow",
            " wall_material_flow",
            "  wall_0_material_flow",
            "  wall_x_material_flow",
            " skin_material_flow",
            " roofing_material_flow",
            " infill_material_flow",
            " skirt_brim_material_flow",
            " support_material_flow",
            " support_interface_material_flow",
            "  support_roof_material_flow",
            "  support_bottom_material_flow",
            " prime_tower_flow",
            "material_flow_layer_0",
            "material_standby_temperature",

        "Speed:",
            "speed_print",
            " speed_infill",
            " speed_wall",
            " speed_wall_0",
            " speed_wall_x",
            " speed_roofing",
            " speed_topbottom",
            " speed_support",
            "  speed_support_infill",
            "  speed_support_interface",
            "   speed_support_roof",
            "   speed_support_bottom",
            "speed_travel",
            "speed_layer_0",
            " speed_print_layer_0",
            " speed_travel_layer_0",
            "skirt_brim_speed",
            "speed_z_hop",
            "speed_slowdown_layers",
            "speed_equalize_flow_enabled",
            "speed_equalize_flow_max",
            "acceleration_enabled",
            "acceleration_print",
            " acceleration_infill",
            " acceleration_wall",
            "  acceleration_wall_0",
            "  acceleration_wall_x",
            " acceleration_roofing",
            " acceleration_topbottom",
            " acceleration_support",
            "  acceleration_support_infill",
            "  acceleration_support_interface",
            "  acceleration_support_roof",
            "  acceleration_support_bottom",
            "acceleration_travel",
            "acceleration_layer_0",
            " acceleration_print_layer_0",
            " acceleration_travel_layer_0",
            "acceleration_skirt_brim",
            "jerk_enabled",
            "jerk_print",
            " jerk_infill",
            " jerk_wall",
            "  jerk_wall_0",
            "  jerk_wall_x",
            " jerk_roofing",
            " jerk_topbottom",
            " jerk_support",
            "  jerk_support_infill",
            "  jerk_support_interface",
            "   jerk_support_roof",
            "   jerk_support_bottom",
            "jerk_travel",
            "jerk_layer_0",
            " jerk_print_layer_0",
            " jerk_travel_layer_0",
            "jerk_skirt_brim",

        "Travel:",
            "retraction_enable",
            "retract_at_layer_change",
            "retraction_amount",
            "retraction_speed",
            " retraction_retract_speed",
            " retraction_prime_speed",
            "retraction_extra_prime_amount",
            "retraction_min_travel",
            "retraction_count_max",
            "retraction_extrusion_window",
            "limit_support_retractions",
            "retraction_combing",
            "retraction_combing_max_distance",
            "travel_retract_before_outer_wall",
            "travel_avoid_other_parts",
            "travel_avoid_supports",
            "travel_avoid_distance",
            "layer_start_x",
            "layer_start_y",
            "retraction_hop_enabled",
            "retraction_hop_only_when_collides",
            "retraction_hop",

        "Cooling:",
            "cool_fan_enabled",
            "cool_fan_speed",
            " cool_fan_speed_min",
            " cool_fan_speed_max",
            "cool_min_layer_time_fan_speed_max",
            "cool_fan_speed_0",
            "cool_fan_full_at_height",
            " cool_fan_full_layer",
            "cool_min_layer_time",
            "cool_min_speed",
            "cool_lift_head",

        "Support:",
            "support_enable",
            "support_structure",
            "support_tree_angle",
            "support_tree_branch_distance",
            "support_tree_branch_diameter",
            "support_tree_branch_diameter_angle",
            "support_tree_collision_resolution",
            "support_type",
            "support_angle",
            "support_pattern",
            "support_wall_count",
            "zig_zaggify_support",
            "support_connect_zigzags",
            "support_infill_rate",
            " support_line_distance",
            " support_initial_layer_line_distance",
            "support_infill_angles",
            "support_brim_enable",
            "support_brim_width",
            " support_brim_line_count",
            "support_z_distance",
            " support_top_distance",
            " support_bottom_distance",
            "support_xy_distance",
            "support_xy_overrides_z",
            "support_xy_distance_overhang",
            "support_bottom_stair_step_height",
            "support_bottom_stair_step_width",
            "support_bottom_stair_step_min_slope",
            "support_join_distance",
            "support_offset",
            "support_infill_sparse_thickness",
            "gradual_support_infill_steps",
            "gradual_support_infill_step_height",
            "minimum_support_area",
            "support_interface_enable",
            " support_roof_enable",
            " support_bottom_enable",
            "support_interface_height",
            " support_roof_height",
            " support_bottom_height",
            "support_interface_skip_height",
            "support_interface_density",
            " support_roof_density",
            "  support_roof_line_distance",
            " support_bottom_density",
            "  support_bottom_line_distance",
            "support_interface_pattern",
            " support_roof_pattern",
            " support_bottom_pattern",
            "minimum_interface_area",
            " minimum_roof_area",
            " minimum_bottom_area",
            "support_interface_offset",
            " support_roof_offset",
            " support_bottom_offset",
            "support_interface_angles",
            " support_roof_angles",
            " support_bottom_angles",
            "support_fan_enable",
            "support_supported_skin_fan_speed",
            "support_use_towers",
            "support_tower_diameter",
            "support_tower_maximum_supported_diameter",
            "support_tower_roof_angle",

        "Platform Adhesion:",
            "adhesion_type",
            "skirt_line_count",
            "skirt_gap",
            "skirt_brim_minimal_length",
            "brim_width",
            " brim_line_count",
            "brim_gap",
            "brim_replaces_support",
            "brim_outside_only",
            "raft_margin",
            "raft_smoothing",
            "raft_airgap",
            "layer_0_z_overlap",
            "raft_surface_layers",
            "raft_surface_thickness",
            "raft_surface_line_width",
            "raft_surface_line_spacing",
            "raft_interface_layers",
            "raft_interface_thickness",
            "raft_interface_line_width",
            "raft_interface_line_spacing",
            "raft_base_thickness",
            "raft_base_line_width",
            "raft_base_line_spacing",
            "raft_speed",
            " raft_surface_speed",
            " raft_interface_speed",
            " raft_base_speed",
            "raft_acceleration",
            " raft_surface_acceleration",
            " raft_interface_acceleration",
            " raft_base_acceleration",
            "raft_jerk",
            " raft_surface_jerk",
            " raft_interface_jerk",
            " raft_base_jerk",
            "raft_fan_speed",
            " raft_surface_fan_speed",
            " raft_interface_fan_speed",
            " raft_base_fan_speed",

        "Mesh Fix:",
            "meshfix_union_all",
            "meshfix_union_all_remove_holes",
            "meshfix_extensive_stitching",
            "meshfix_keep_open_polygons",
            "multiple_mesh_overlap",
            "carve_multiple_volumes",
            "alternate_carve_order",
            "remove_empty_first_layers",
            "meshfix_maximum_resolution",
            "meshfix_maximum_travel_resolution",
            "meshfix_maximum_deviation",

        "BlackMagic:",
            "infill_mesh",
            "infill_mesh_order",
            "cutting_mesh",
            "mold_enabled",
            "mold_width",
            "mold_roof_height",
            "mold_angle",
            "support_mesh",
            "anti_overhang_mesh",
            "magic_mesh_surface_mode",
            "magic_spiralize",
            "smooth_spiralized_contours",
            "relative_extrusion",

    ],


    /************************** SynDaver Expert **************************/
   "expert" : [
        // Expert settings list
        "Machine Settings:",
            "machine_name",
            "machine_show_variants",
            "machine_start_gcode",
            "machine_end_gcode",
            "material_guid",
            "material_diameter",
            "material_bed_temp_wait",
            "material_print_temp_wait",
            "material_print_temp_prepend",
            "material_bed_temp_prepend",
            "machine_width",
            "machine_depth",
            "machine_height",
            "machine_shape",
            "machine_buildplate_type",
            "machine_heated_bed",
            "machine_heated_build_volume",
            "machine_always_write_active_tool",
            "machine_center_is_zero",
            "machine_extruder_count",
            "extruders_enabled_count",
            "machine_nozzle_tip_outer_diameter",
            "machine_nozzle_head_distance",
            "machine_nozzle_expansion_angle",
            "machine_heat_zone_length",
            "machine_nozzle_temp_enabled",
            "machine_nozzle_heat_up_speed",
            "machine_nozzle_cool_down_speed",
            "machine_min_cool_heat_time_window",
            "machine_gcode_flavor",
            "machine_firmware_retract",
            "machine_extruders_share_heater",
            "machine_extruders_share_nozzle",
            "machine_extruders_shared_nozzle_initial_retraction",
            "machine_disallowed_areas",
            "nozzle_disallowed_areas",
            "machine_head_with_fans_polygon",
            "gantry_height",
            "machine_nozzle_id",
            "machine_nozzle_size",
            "machine_use_extruder_offset_to_offset_coords",
            "extruder_prime_pos_z",
            "extruder_prime_pos_abs",
            "machine_max_feedrate_x",
            "machine_max_feedrate_y",
            "machine_max_feedrate_z",
            "machine_max_feedrate_e",
            "machine_max_acceleration_x",
            "machine_max_acceleration_y",
            "machine_max_acceleration_z",
            "machine_max_acceleration_e",
            "machine_acceleration",
            "machine_max_jerk_xy",
            "machine_max_jerk_z",
            "machine_max_jerk_e",
            "machine_steps_per_mm_x",
            "machine_steps_per_mm_y",
            "machine_steps_per_mm_z",
            "machine_steps_per_mm_e",
            "machine_endstop_positive_direction_x",
            "machine_endstop_positive_direction_y",
            "machine_endstop_positive_direction_z",
            "machine_minimum_feedrate",
            "machine_feeder_wheel_diameter",

        "Resolution:",
            "layer_height",
            "layer_height_0",
            "line_width",
            " wall_line_width",
            "  wall_line_width_0",
            "  wall_line_width_x",
            " skin_line_width",
            " infill_line_width",
            " skirt_brim_line_width",
            " support_line_width",
            " support_interface_line_width",
            "  support_roof_line_width",
            "  support_bottom_line_width",
            " prime_tower_line_width",
            "initial_layer_line_width_factor",

        "Shell:",
            "wall_extruder_nr",
            " wall_0_extruder_nr",
            " wall_x_extruder_nr",
            "wall_thickness",
            " wall_line_count",
            "wall_0_wipe_dist",
            "wall_0_inset",
            "optimize_wall_printing_order",
            "outer_inset_first",
            "alternate_extra_perimeter",
            "travel_compensate_overlapping_walls_enabled",
            " travel_compensate_overlapping_walls_0_enabled",
            " travel_compensate_overlapping_walls_x_enabled",
            "wall_min_flow",
            "wall_min_flow_retract",
            "fill_perimeter_gaps",
            "filter_out_tiny_gaps",
            "fill_outline_gaps",
            "xy_offset",
            "xy_offset_layer_0",
            "hole_xy_offset",
            "z_seam_type",
            "z_seam_position",
            " z_seam_x",
            " z_seam_y",
            "z_seam_corner",
            "z_seam_relative",

        "Top/Bottom:",
            "roofing_extruder_nr",
            "roofing_layer_count",
            "top_bottom_extruder_nr",
            "top_bottom_thickness",
            " top_thickness",
            "  top_layers",
            " bottom_thickness",
            "  bottom_layers",
            "  initial_bottom_layers",
            "top_bottom_pattern",
            "top_bottom_pattern_0",
            "connect_skin_polygons",
            "skin_monotonic",
            "skin_angles",
            "skin_no_small_gaps_heuristic",
            "skin_outline_count",
            "ironing_enabled",
            "ironing_only_highest_layer",
            "ironing_pattern",
            "ironing_monotonic",
            "ironing_line_spacing",
            "ironing_flow",
            "ironing_inset",
            "speed_ironing",
            "acceleration_ironing",
            "jerk_ironing",
            "skin_overlap",
            " skin_overlap_mm",
            "skin_preshrink",
            " top_skin_preshrink",
            " bottom_skin_preshrink",
            "expand_skins_expand_distance",
            " top_skin_expand_distance",
            " bottom_skin_expand_distance",
            "max_skin_angle_for_expansion",
            " min_skin_width_for_expansion",

        "Infill:",
            "infill_extruder_nr",
            "infill_sparse_density",
            " infill_line_distance",
            "infill_pattern",
            "zig_zaggify_infill",
            "connect_infill_polygons",
            "infill_angles",
            "infill_offset_x",
            "infill_offset_y",
            "infill_randomize_start_location",
            "infill_multiplier",
            "infill_wall_line_count",
            "sub_div_rad_add",
            "infill_overlap",
            " infill_overlap_mm",
            "infill_wipe_dist",
            "infill_sparse_thickness",
            "gradual_infill_steps",
            "gradual_infill_step_height",
            "infill_before_walls",
            "min_infill_area",
            "infill_support_enabled",
            "infill_support_angle",
            "skin_edge_support_thickness",
            " skin_edge_support_layers",
            "lightning_infill_support_angle",
            " lightning_infill_overhang_angle",
            " lightning_infill_prune_angle",
            " lightning_infill_straightening_angle",

        "Material:",
            "default_material_print_temperature",
            "build_volume_temperature",
            "material_print_temperature",
            "material_print_temperature_layer_0",
            "material_initial_print_temperature",
            "material_final_print_temperature",
            "material_extrusion_cool_down_speed",
            "default_material_bed_temperature",
            "material_bed_temperature",
            "material_bed_temperature_layer_0",
            "material_adhesion_tendency",
            "material_surface_energy",
            "material_shrinkage_percentage",
            "material_crystallinity",
            "material_anti_ooze_retracted_position",
            "material_anti_ooze_retraction_speed",
            "material_break_preparation_retracted_position",
            "material_break_preparation_speed",
            "material_break_preparation_temperature",
            "material_break_retracted_position",
            "material_break_speed",
            "material_break_temperature",
            "material_flush_purge_speed",
            "material_flush_purge_length",
            "material_end_of_filament_purge_speed",
            "material_end_of_filament_purge_length",
            "material_maximum_park_duration",
            "material_no_load_move_factor",
            "material_flow",
            " wall_material_flow",
            "  wall_0_material_flow",
            "  wall_x_material_flow",
            " skin_material_flow",
            " roofing_material_flow",
            " infill_material_flow",
            " skirt_brim_material_flow",
            " support_material_flow",
            " support_interface_material_flow",
            "  support_roof_material_flow",
            "  support_bottom_material_flow",
            " prime_tower_flow",
            "material_flow_layer_0",
            "material_standby_temperature",

        "Speed:",
            "speed_print",
            " speed_infill",
            " speed_wall",
            " speed_wall_0",
            " speed_wall_x",
            " speed_roofing",
            " speed_topbottom",
            " speed_support",
            "  speed_support_infill",
            "  speed_support_interface",
            "   speed_support_roof",
            "   speed_support_bottom",
            " speed_prime_tower",
            "speed_travel",
            "speed_layer_0",
            " speed_print_layer_0",
            " speed_travel_layer_0",
            "skirt_brim_speed",
            "speed_z_hop",
            "speed_slowdown_layers",
            "speed_equalize_flow_enabled",
            "speed_equalize_flow_max",
            "acceleration_enabled",
            "acceleration_print",
            " acceleration_infill",
            " acceleration_wall",
            "  acceleration_wall_0",
            "  acceleration_wall_x",
            " acceleration_roofing",
            " acceleration_topbottom",
            " acceleration_support",
            "  acceleration_support_infill",
            "  acceleration_support_interface",
            "  acceleration_support_roof",
            "  acceleration_support_bottom",
            " acceleration_prime_tower",
            "acceleration_travel",
            "acceleration_layer_0",
            " acceleration_print_layer_0",
            " acceleration_travel_layer_0",
            "acceleration_skirt_brim",
            "jerk_enabled",
            "jerk_print",
            " jerk_infill",
            " jerk_wall",
            "  jerk_wall_0",
            "  jerk_wall_x",
            " jerk_roofing",
            " jerk_topbottom",
            " jerk_support",
            "  jerk_support_infill",
            "  jerk_support_interface",
            "   jerk_support_roof",
            "   jerk_support_bottom",
            " jerk_prime_tower",
            "jerk_travel",
            "jerk_layer_0",
            " jerk_print_layer_0",
            " jerk_travel_layer_0",
            "jerk_skirt_brim",

        "Travel:",
            "retraction_enable",
            "retract_at_layer_change",
            "retraction_amount",
            "retraction_speed",
            " retraction_retract_speed",
            " retraction_prime_speed",
            "retraction_extra_prime_amount",
            "retraction_min_travel",
            "retraction_count_max",
            "retraction_extrusion_window",
            "limit_support_retractions",
            "retraction_combing",
            "retraction_combing_max_distance",
            "travel_retract_before_outer_wall",
            "travel_avoid_other_parts",
            "travel_avoid_supports",
            "travel_avoid_distance",
            "layer_start_x",
            "layer_start_y",
            "retraction_hop_enabled",
            "retraction_hop_only_when_collides",
            "retraction_hop",
            "retraction_hop_after_extruder_switch",
            "retraction_hop_after_extruder_switch_height",

        "Cooling:",
            "cool_fan_enabled",
            "cool_fan_speed",
            " cool_fan_speed_min",
            " cool_fan_speed_max",
            "cool_min_layer_time_fan_speed_max",
            "cool_fan_speed_0",
            "cool_fan_full_at_height",
            " cool_fan_full_layer",
            "cool_min_layer_time",
            "cool_min_speed",
            "cool_lift_head",

        "Support:",
            "support_enable",
            "support_extruder_nr",
            " support_infill_extruder_nr",
            " support_extruder_nr_layer_0",
            " support_interface_extruder_nr",
            "  support_roof_extruder_nr",
            "  support_bottom_extruder_nr",
            "support_structure",
            "support_tree_angle",
            "support_tree_branch_distance",
            "support_tree_branch_diameter",
            "support_tree_branch_diameter_angle",
            "support_tree_collision_resolution",
            "support_type",
            "support_angle",
            "support_pattern",
            "support_wall_count",
            "zig_zaggify_support",
            "support_connect_zigzags",
            "support_infill_rate",
            " support_line_distance",
            " support_initial_layer_line_distance",
            "support_infill_angles",
            "support_brim_enable",
            "support_brim_width",
            " support_brim_line_count",
            "support_z_distance",
            " support_top_distance",
            " support_bottom_distance",
            "support_xy_distance",
            "support_xy_overrides_z",
            "support_xy_distance_overhang",
            "support_bottom_stair_step_height",
            "support_bottom_stair_step_width",
            "support_bottom_stair_step_min_slope",
            "support_join_distance",
            "support_offset",
            "support_infill_sparse_thickness",
            "gradual_support_infill_steps",
            "gradual_support_infill_step_height",
            "minimum_support_area",
            "support_interface_enable",
            " support_roof_enable",
            " support_bottom_enable",
            "support_interface_height",
            " support_roof_height",
            " support_bottom_height",
            "support_interface_skip_height",
            "support_interface_density",
            " support_roof_density",
            "  support_roof_line_distance",
            " support_bottom_density",
            "  support_bottom_line_distance",
            "support_interface_pattern",
            " support_roof_pattern",
            " support_bottom_pattern",
            "minimum_interface_area",
            " minimum_roof_area",
            " minimum_bottom_area",
            "support_interface_offset",
            " support_roof_offset",
            " support_bottom_offset",
            "support_interface_angles",
            " support_roof_angles",
            " support_bottom_angles",
            "support_fan_enable",
            "support_supported_skin_fan_speed",
            "support_use_towers",
            "support_tower_diameter",
            "support_tower_maximum_supported_diameter",
            "support_tower_roof_angle",
            "support_mesh_drop_down",
            "support_meshes_present",

        "Platform Adhesion:",
            "prime_blob_enable",
            "extruder_prime_pos_x",
            "extruder_prime_pos_y",
            "adhesion_type",
            "skirt_line_count",
            "skirt_gap",
            "skirt_brim_minimal_length",
            "brim_width",
            " brim_line_count",
            "brim_gap",
            "brim_replaces_support",
            "brim_outside_only",
            "raft_margin",
            "raft_smoothing",
            "raft_airgap",
            "layer_0_z_overlap",
            "raft_surface_layers",
            "raft_surface_thickness",
            "raft_surface_line_width",
            "raft_surface_line_spacing",
            "raft_interface_layers",
            "raft_interface_thickness",
            "raft_interface_line_width",
            "raft_interface_line_spacing",
            "raft_base_thickness",
            "raft_base_line_width",
            "raft_base_line_spacing",
            "raft_speed",
            " raft_surface_speed",
            " raft_interface_speed",
            " raft_base_speed",
            "raft_acceleration",
            " raft_surface_acceleration",
            " raft_interface_acceleration",
            " raft_base_acceleration",
            "raft_jerk",
            " raft_surface_jerk",
            " raft_interface_jerk",
            " raft_base_jerk",
            "raft_fan_speed",
            " raft_surface_fan_speed",
            " raft_interface_fan_speed",
            " raft_base_fan_speed",

        "Mesh Fix:",
            "meshfix_union_all",
            "meshfix_union_all_remove_holes",
            "meshfix_extensive_stitching",
            "meshfix_keep_open_polygons",
            "multiple_mesh_overlap",
            "carve_multiple_volumes",
            "alternate_carve_order",
            "remove_empty_first_layers",
            "meshfix_maximum_resolution",
            "meshfix_maximum_travel_resolution",
            "meshfix_maximum_deviation",

        "Magic:",
            "infill_mesh",
            "infill_mesh_order",
            "cutting_mesh",
            "mold_enabled",
            "mold_width",
            "mold_roof_height",
            "mold_angle",
            "support_mesh",
            "anti_overhang_mesh",
            "magic_mesh_surface_mode",
            "magic_spiralize",
            "smooth_spiralized_contours",
            "relative_extrusion",

        "Experimental:",
            "slicing_tolerance",
            "roofing_line_width",
            "roofing_pattern",
            "roofing_monotonic",
            "roofing_angles",
            "infill_enable_travel_optimization",
            "material_flow_dependent_temperature",
            "material_flow_temp_graph",
            "minimum_polygon_circumference",
            "support_skip_some_zags",
            "support_skip_zag_per_mm",
            " support_zag_skip_count",
            "draft_shield_enabled",
            "draft_shield_dist",
            "draft_shield_height_limitation",
            "draft_shield_height",
            "conical_overhang_enabled",
            "conical_overhang_angle",
            "conical_overhang_hole_size",
            "coasting_enable",
            "coasting_volume",
            "coasting_min_volume",
            "coasting_speed",
            "cross_infill_pocket_size",
            "cross_infill_density_image",
            "cross_support_density_image",
            "support_conical_enabled",
            "support_conical_angle",
            "support_conical_min_width",
            "magic_fuzzy_skin_enabled",
            "magic_fuzzy_skin_outside_only",
            "magic_fuzzy_skin_thickness",
            "magic_fuzzy_skin_point_density",
            " magic_fuzzy_skin_point_dist",
            "flow_rate_max_extrusion_offset",
            "flow_rate_extrusion_offset_factor",
            "wireframe_enabled",
            "wireframe_height",
            "wireframe_roof_inset",
            "wireframe_printspeed",
            " wireframe_printspeed_bottom",
            " wireframe_printspeed_up",
            " wireframe_printspeed_down",
            " wireframe_printspeed_flat",
            "wireframe_flow",
            " wireframe_flow_connection",
            " wireframe_flow_flat",
            "wireframe_top_delay",
            "wireframe_bottom_delay",
            "wireframe_flat_delay",
            "wireframe_up_half_speed",
            "wireframe_top_jump",
            "wireframe_fall_down",
            "wireframe_drag_along",
            "wireframe_strategy",
            "wireframe_straight_before_down",
            "wireframe_roof_fall_down",
            "wireframe_roof_drag_along",
            "wireframe_roof_outer_delay",
            "wireframe_nozzle_clearance",
            "adaptive_layer_height_enabled",
            "adaptive_layer_height_variation",
            "adaptive_layer_height_variation_step",
            "adaptive_layer_height_threshold",
            "wall_overhang_angle",
            "wall_overhang_speed_factor",
            "bridge_settings_enabled",
            "bridge_wall_min_length",
            "bridge_skin_support_threshold",
            "bridge_sparse_infill_max_density",
            "bridge_wall_coast",
            "bridge_wall_speed",
            "bridge_wall_material_flow",
            "bridge_skin_speed",
            "bridge_skin_material_flow",
            "bridge_skin_density",
            "bridge_fan_speed",
            "bridge_enable_more_layers",
            "bridge_skin_speed_2",
            "bridge_skin_material_flow_2",
            "bridge_skin_density_2",
            "bridge_fan_speed_2",
            "bridge_skin_speed_3",
            "bridge_skin_material_flow_3",
            "bridge_skin_density_3",
            "bridge_fan_speed_3",
            "clean_between_layers",
            "max_extrusion_before_wipe",
            "wipe_retraction_enable",
            "wipe_retraction_amount",
            "wipe_retraction_extra_prime_amount",
            "wipe_retraction_speed",
            " wipe_retraction_retract_speed",
            " wipe_retraction_prime_speed",
            "wipe_pause",
            "wipe_hop_enable",
            "wipe_hop_amount",
            "wipe_hop_speed",
            "wipe_brush_pos_x",
            "wipe_repeat_count",
            "wipe_move_distance",
            "small_hole_max_size",
            " small_feature_max_length",
            "small_feature_speed_factor",
            "small_feature_speed_factor_0",

        "Command Line Settings:",
            "center_object",
            "mesh_position_x",
            "mesh_position_y",
            "mesh_position_z",
            "mesh_rotation_matrix",
    ]
};