// Global variables
const MAX_HISTORY_ITEMS = 30;
let blueprintHistory = [];
let jsonEditor;
let searchCursor;
const iconsList = [
  { name: '', img: 'https://i.ibb.co/4wSMBjSf/Pusto.png' },
  { name: 'crash-site-chest-1', img: 'https://i.ibb.co/qFCnW6dn/crash-site-chest-1.png', needsEntityType: true },{ name: 'fire-flame', img: 'https://i.ibb.co/rRqVG0dC/fire-flame.png', needsEntityType: true },{ name: 'crash-site-spaceship', img: 'https://i.ibb.co/4gPG3C8Y/crash-site-spaceship.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-big-1', img: 'https://i.ibb.co/mCqVRL4S/crash-site-spaceship-wreck-big-1.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-big-2', img: 'https://i.ibb.co/MyC23374/crash-site-spaceship-wreck-big-2.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-medium-1', img: 'https://i.ibb.co/Xf98X78H/crash-site-spaceship-wreck-medium-1.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-medium-2', img: 'https://i.ibb.co/dJ6Q0x6C/crash-site-spaceship-wreck-medium-2.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-medium-3', img: 'https://i.ibb.co/d4S7gDG4/crash-site-spaceship-wreck-medium-3.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-small-1', img: 'https://i.ibb.co/JwyCHxJL/crash-site-spaceship-wreck-small-1.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-small-2', img: 'https://i.ibb.co/rfMCnswz/crash-site-spaceship-wreck-small-2.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-small-3', img: 'https://i.ibb.co/GvRwzKvm/crash-site-spaceship-wreck-small-3.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-small-4', img: 'https://i.ibb.co/LzjPLNn3/crash-site-spaceship-wreck-small-4.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-small-5', img: 'https://i.ibb.co/1fqg7rDn/crash-site-spaceship-wreck-small-5.png', needsEntityType: true },{ name: 'crash-site-spaceship-wreck-small-6', img: 'https://i.ibb.co/6JrLvWqS/crash-site-spaceship-wreck-small-6.png', needsEntityType: true },{ name: 'dummy-rail-ramp', img: 'https://i.ibb.co/KjjyGHR7/dummy-rail-ramp.png', needsEntityType: true },{ name: 'dummy-spider-unit', img: 'https://i.ibb.co/RpWD7r5j/dummy-spider-unit.png', needsEntityType: true },{ name: 'factorio-logo-11tiles', img: 'https://i.ibb.co/ZR1SXrQB/factorio-logo-11tiles.png', needsEntityType: true },{ name: 'factorio-logo-16tiles', img: 'https://i.ibb.co/3nZW0bs/factorio-logo-16tiles.png', needsEntityType: true },{ name: 'factorio-logo-22tiles', img: 'https://i.ibb.co/svxnjSpP/factorio-logo-22tiles.png', needsEntityType: true },{ name: 'loader-1x1', img: 'https://i.ibb.co/4RM4Pt4x/loader-1x1.png', needsEntityType: true },{ name: 'electric-energy-interface', img: 'https://i.ibb.co/v4fhbfq6/electric-energy-interface.png', needsEntityType: true },{ name: 'linked-chest', img: 'https://i.ibb.co/6crjWH3L/linked-chest.png', needsEntityType: true },{ name: 'proxy-container', img: 'https://i.ibb.co/fdVZPQKj/proxy-container.png', needsEntityType: true },{ name: 'heat-interface', img: 'https://i.ibb.co/zT5SFdf5/heat-interface.png', needsEntityType: true },{ name: 'lane-splitter', img: 'https://i.ibb.co/6cLWPYy8/lane-splitter.png', needsEntityType: true },{ name: 'linked-belt', img: 'https://i.ibb.co/6ckSVBFd/linked-belt.png', needsEntityType: true },{ name: 'infinity-cargo-wagon', img: 'https://i.ibb.co/XxMf17B4/infinity-cargo-wagon.png', needsEntityType: true },{ name: 'infinity-chest', img: 'https://i.ibb.co/YBcYrGS8/infinity-chest.png', needsEntityType: true },{ name: 'infinity-pipe', img: 'https://i.ibb.co/CKy2Tg5P/infinity-pipe.png', needsEntityType: true },{ name: 'half-diagonal-rail', img: 'https://i.ibb.co/5xj33Y3z/half-diagonal-rail.png', needsEntityType: true },{ name: 'curved-rail-a', img: 'https://i.ibb.co/6M6WcMS/curved-rail-a.png', needsEntityType: true },{ name: 'curved-rail-b', img: 'https://i.ibb.co/yFZG0Vkx/curved-rail-b.png', needsEntityType: true },{ name: 'elevated-straight-rail', img: 'https://i.ibb.co/7tJyfw5H/elevated-straight-rail.png', needsEntityType: true },{ name: 'elevated-half-diagonal-rail', img: 'https://i.ibb.co/0VJLqxsr/elevated-half-diagonal-rail.png', needsEntityType: true },{ name: 'elevated-curved-rail-a', img: 'https://i.ibb.co/wFbqXD5X/elevated-curved-rail-a.png', needsEntityType: true },{ name: 'elevated-curved-rail-b', img: 'https://i.ibb.co/Wp08m13C/elevated-curved-rail-b.png', needsEntityType: true },{ name: 'half-diagonal-rail-remnants', img: 'https://i.ibb.co/67FzLj7m/half-diagonal-rail-remnants.png', needsEntityType: true },{ name: 'curved-rail-a-remnants', img: 'https://i.ibb.co/wh3r30RT/curved-rail-a-remnants.png', needsEntityType: true },{ name: 'small-biter-corpse', img: 'https://i.ibb.co/bgrWd5S9/small-biter-corpse.png', needsEntityType: true },{ name: 'medium-biter-corpse', img: 'https://i.ibb.co/MDZpk1BP/medium-biter-corpse.png', needsEntityType: true },{ name: 'big-biter-corpse', img: 'https://i.ibb.co/WWLRPFTZ/big-biter-corpse.png', needsEntityType: true },{ name: 'behemoth-biter-corpse', img: 'https://i.ibb.co/5zzvSyL/behemoth-biter-corpse.png', needsEntityType: true },{ name: 'small-spitter-corpse', img: 'https://i.ibb.co/99gtnY1W/small-spitter-corpse.png', needsEntityType: true },{ name: 'medium-spitter-corpse', img: 'https://i.ibb.co/HTS8VvJ0/medium-spitter-corpse.png', needsEntityType: true },{ name: 'big-spitter-corpse', img: 'https://i.ibb.co/Sw8TYd6Z/big-spitter-corpse.png', needsEntityType: true },{ name: 'behemoth-spitter-corpse', img: 'https://i.ibb.co/xK7TYcwF/behemoth-spitter-corpse.png', needsEntityType: true },{ name: 'small-worm-corpse', img: 'https://i.ibb.co/zVjp9ZCq/small-worm-corpse.png', needsEntityType: true },{ name: 'medium-worm-corpse', img: 'https://i.ibb.co/WWPxKBsn/medium-worm-corpse.png', needsEntityType: true },{ name: 'big-worm-corpse', img: 'https://i.ibb.co/spH7cXHZ/big-worm-corpse.png', needsEntityType: true },{ name: 'behemoth-worm-corpse', img: 'https://i.ibb.co/KpZJmfW4/behemoth-worm-corpse.png', needsEntityType: true },{ name: 'small-wriggler-pentapod-corpse', img: 'https://i.ibb.co/0pp15vPH/small-wriggler-pentapod-corpse.png', needsEntityType: true },{ name: 'medium-wriggler-pentapod-corpse', img: 'https://i.ibb.co/nMbLNDJH/medium-wriggler-pentapod-corpse.png', needsEntityType: true },{ name: 'big-wriggler-pentapod-corpse', img: 'https://i.ibb.co/rGP05kRW/big-wriggler-pentapod-corpse.png', needsEntityType: true },{ name: 'biter-spawner-corpse', img: 'https://i.ibb.co/39xf14Qq/biter-spawner-corpse.png', needsEntityType: true },{ name: 'spitter-spawner-corpse', img: 'https://i.ibb.co/n8Dv4R10/spitter-spawner-corpse.png', needsEntityType: true },{ name: 'small-remnants', img: 'https://i.ibb.co/twD5NZG8/small-remnants.png', needsEntityType: true },{ name: 'small-scorchmark', img: 'https://i.ibb.co/mrq1Xm8b/small-scorchmark.png', needsEntityType: true },{ name: 'tree-01-stump', img: 'https://i.ibb.co/m5KvR9sc/tree-01-stump.png', needsEntityType: true },{ name: 'tree-02-stump', img: 'https://i.ibb.co/KjD6R96W/tree-02-stump.png', needsEntityType: true },{ name: 'tree-03-stump', img: 'https://i.ibb.co/7J8P2pGT/tree-03-stump.png', needsEntityType: true },{ name: 'tree-04-stump', img: 'https://i.ibb.co/ycSKqrgp/tree-04-stump.png', needsEntityType: true },{ name: 'tree-05-stump', img: 'https://i.ibb.co/KpBDQzh1/tree-05-stump.png', needsEntityType: true },{ name: 'tree-06-stump', img: 'https://i.ibb.co/sv2gsscR/tree-06-stump.png', needsEntityType: true },{ name: 'tree-07-stump', img: 'https://i.ibb.co/xtDVn1pW/tree-07-stump.png', needsEntityType: true },{ name: 'tree-08-stump', img: 'https://i.ibb.co/fGN3SLPV/tree-08-stump.png', needsEntityType: true },{ name: 'tree-09-stump', img: 'https://i.ibb.co/RkYPC1yQ/tree-09-stump.png', needsEntityType: true },{ name: 'massive-explosion', img: 'https://i.ibb.co/JR9jHvLt/massive-explosion.png', needsEntityType: true },{ name: 'explosion-hit', img: 'https://i.ibb.co/Ndk0NVCF/explosion-hit.png', needsEntityType: true },{ name: 'grenade-explosion', img: 'https://i.ibb.co/zHJ7wY0k/grenade-explosion.png', needsEntityType: true },{ name: 'ground-explosion', img: 'https://i.ibb.co/HfqQDhwS/ground-explosion.png', needsEntityType: true },{ name: 'vulcanus-cliff-collapse', img: 'https://i.ibb.co/LzBWr3CW/vulcanus-cliff-collapse.png', needsEntityType: true },{ name: 'big-artillery-explosion', img: 'https://i.ibb.co/LdXrvrpj/big-artillery-explosion.png', needsEntityType: true },{ name: 'explosion', img: 'https://i.ibb.co/0V1nwpM1/explosion.png', needsEntityType: true },{ name: 'uranium-cannon-shell-explosion', img: 'https://i.ibb.co/SD1w0WVG/uranium-cannon-shell-explosion.png', needsEntityType: true },{ name: 'nuke-explosion', img: 'https://i.ibb.co/Jj50DtPw/nuke-explosion.png', needsEntityType: true },{ name: 'cluster-nuke-explosion', img: 'https://i.ibb.co/DTDwD7b/cluster-nuke-explosion.png', needsEntityType: true },{ name: 'enemy-damaged-explosion', img: 'https://i.ibb.co/PZV0N6xd/enemy-damaged-explosion.png', needsEntityType: true },{ name: 'gleba-enemy-damaged-explosion', img: 'https://i.ibb.co/ZzRWsBc6/gleba-enemy-damaged-explosion.png', needsEntityType: true },{ name: 'spark-explosion', img: 'https://i.ibb.co/JFnvrv38/spark-explosion.png', needsEntityType: true },{ name: 'spark-explosion-higher', img: 'https://i.ibb.co/99LqYyDz/spark-explosion-higher.png', needsEntityType: true },{ name: 'wall-damaged-explosion', img: 'https://i.ibb.co/bM5J81f0/wall-damaged-explosion.png', needsEntityType: true },{ name: 'flying-robot-damaged-explosion', img: 'https://i.ibb.co/FkGM0FHP/flying-robot-damaged-explosion.png', needsEntityType: true },{ name: 'rock-damaged-explosion', img: 'https://i.ibb.co/XkGvvjM7/rock-damaged-explosion.png', needsEntityType: true },{ name: 'blood-fountain', img: 'https://i.ibb.co/Swgf21Wp/blood-fountain.png', needsEntityType: true },{ name: 'gleba-blood-fountain', img: 'https://i.ibb.co/hjZz8L4/gleba-blood-fountain.png', needsEntityType: true },
  { name: 'wooden-chest', img: 'https://wiki.factorio.com/images/thumb/Wooden_chest.png/32px-Wooden_chest.png', }, { name: 'iron-chest', img: 'https://wiki.factorio.com/images/thumb/Iron_chest.png/32px-Iron_chest.png', }, { name: 'steel-chest', img: 'https://wiki.factorio.com/images/thumb/Steel_chest.png/32px-Steel_chest.png', }, { name: 'storage-tank', img: 'https://wiki.factorio.com/images/thumb/Storage_tank.png/32px-Storage_tank.png', }, { name: 'transport-belt', img: 'https://wiki.factorio.com/images/thumb/Transport_belt.png/32px-Transport_belt.png', }, { name: 'fast-transport-belt', img: 'https://wiki.factorio.com/images/thumb/Fast_transport_belt.png/32px-Fast_transport_belt.png', }, { name: 'express-transport-belt', img: 'https://wiki.factorio.com/images/thumb/Express_transport_belt.png/32px-Express_transport_belt.png', }, { name: 'turbo-transport-belt', img: 'https://wiki.factorio.com/images/thumb/Turbo_transport_belt.png/32px-Turbo_transport_belt.png', }, { name: 'underground-belt', img: 'https://wiki.factorio.com/images/thumb/Underground_belt.png/32px-Underground_belt.png', }, { name: 'fast-underground-belt', img: 'https://wiki.factorio.com/images/thumb/Fast_underground_belt.png/32px-Fast_underground_belt.png', }, { name: 'express-underground-belt', img: 'https://wiki.factorio.com/images/thumb/Express_underground_belt.png/32px-Express_underground_belt.png', }, { name: 'turbo-underground-belt', img: 'https://wiki.factorio.com/images/thumb/Turbo_underground_belt.png/32px-Turbo_underground_belt.png', }, { name: 'splitter', img: 'https://wiki.factorio.com/images/thumb/Splitter.png/32px-Splitter.png', }, { name: 'fast-splitter', img: 'https://wiki.factorio.com/images/thumb/Fast_splitter.png/32px-Fast_splitter.png', }, { name: 'express-splitter', img: 'https://wiki.factorio.com/images/thumb/Express_splitter.png/32px-Express_splitter.png', }, { name: 'turbo-splitter', img: 'https://wiki.factorio.com/images/thumb/Turbo_splitter.png/32px-Turbo_splitter.png', }, { name: 'burner-inserter', img: 'https://wiki.factorio.com/images/thumb/Burner_inserter.png/32px-Burner_inserter.png', }, { name: 'inserter', img: 'https://wiki.factorio.com/images/thumb/Inserter.png/32px-Inserter.png', }, { name: 'long-handed-inserter', img: 'https://wiki.factorio.com/images/thumb/Long-handed_inserter.png/32px-Long-handed_inserter.png', }, { name: 'fast-inserter', img: 'https://wiki.factorio.com/images/thumb/Fast_inserter.png/32px-Fast_inserter.png', }, { name: 'bulk-inserter', img: 'https://wiki.factorio.com/images/thumb/Bulk_inserter.png/32px-Bulk_inserter.png', }, { name: 'stack-inserter', img: 'https://wiki.factorio.com/images/thumb/Stack_inserter.png/32px-Stack_inserter.png', }, { name: 'small-electric-pole', img: 'https://wiki.factorio.com/images/thumb/Small_electric_pole.png/32px-Small_electric_pole.png', }, { name: 'medium-electric-pole', img: 'https://wiki.factorio.com/images/thumb/Medium_electric_pole.png/32px-Medium_electric_pole.png', }, { name: 'big-electric-pole', img: 'https://wiki.factorio.com/images/thumb/Big_electric_pole.png/32px-Big_electric_pole.png', }, { name: 'substation', img: 'https://wiki.factorio.com/images/thumb/Substation.png/32px-Substation.png', }, { name: 'pipe', img: 'https://wiki.factorio.com/images/thumb/Pipe.png/32px-Pipe.png', }, { name: 'pipe-to-ground', img: 'https://wiki.factorio.com/images/thumb/Pipe_to_ground.png/32px-Pipe_to_ground.png', }, { name: 'pump', img: 'https://wiki.factorio.com/images/thumb/Pump.png/32px-Pump.png', }, { name: 'rail', img: 'https://wiki.factorio.com/images/thumb/Straight_rail.png/32px-Straight_rail.png', }, { name: 'rail-ramp', img: 'https://wiki.factorio.com/images/thumb/Rail_ramp.png/32px-Rail_ramp.png', }, { name: 'rail-support', img: 'https://wiki.factorio.com/images/thumb/Rail_support.png/32px-Rail_support.png', }, { name: 'train-stop', img: 'https://wiki.factorio.com/images/thumb/Train_stop.png/32px-Train_stop.png', }, { name: 'rail-signal', img: 'https://wiki.factorio.com/images/thumb/Rail_signal.png/32px-Rail_signal.png', }, { name: 'rail-chain-signal', img: 'https://wiki.factorio.com/images/thumb/Rail_chain_signal.png/32px-Rail_chain_signal.png', }, { name: 'locomotive', img: 'https://wiki.factorio.com/images/thumb/Locomotive.png/32px-Locomotive.png', }, { name: 'cargo-wagon', img: 'https://wiki.factorio.com/images/thumb/Cargo_wagon.png/32px-Cargo_wagon.png', }, { name: 'fluid-wagon', img: 'https://wiki.factorio.com/images/thumb/Fluid_wagon.png/32px-Fluid_wagon.png', }, { name: 'artillery-wagon', img: 'https://wiki.factorio.com/images/thumb/Artillery_wagon.png/32px-Artillery_wagon.png', }, { name: 'car', img: 'https://wiki.factorio.com/images/thumb/Car.png/32px-Car.png', }, { name: 'tank', img: 'https://wiki.factorio.com/images/thumb/Tank.png/32px-Tank.png', }, { name: 'spidertron', img: 'https://wiki.factorio.com/images/thumb/Spidertron.png/32px-Spidertron.png', }, { name: 'logistic-robot', img: 'https://wiki.factorio.com/images/thumb/Logistic_robot.png/32px-Logistic_robot.png', }, { name: 'construction-robot', img: 'https://wiki.factorio.com/images/thumb/Construction_robot.png/32px-Construction_robot.png', }, { name: 'active-provider-chest', img: 'https://wiki.factorio.com/images/thumb/Active_provider_chest.png/32px-Active_provider_chest.png', }, { name: 'passive-provider-chest', img: 'https://wiki.factorio.com/images/thumb/Passive_provider_chest.png/32px-Passive_provider_chest.png', }, { name: 'storage-chest', img: 'https://wiki.factorio.com/images/thumb/Storage_chest.png/32px-Storage_chest.png', }, { name: 'buffer-chest', img: 'https://wiki.factorio.com/images/thumb/Buffer_chest.png/32px-Buffer_chest.png', }, { name: 'requester-chest', img: 'https://wiki.factorio.com/images/thumb/Requester_chest.png/32px-Requester_chest.png', }, { name: 'roboport', img: 'https://wiki.factorio.com/images/thumb/Roboport.png/32px-Roboport.png', }, { name: 'small-lamp', img: 'https://wiki.factorio.com/images/thumb/Lamp.png/32px-Lamp.png', }, { name: 'arithmetic-combinator', img: 'https://wiki.factorio.com/images/thumb/Arithmetic_combinator.png/32px-Arithmetic_combinator.png', }, { name: 'decider-combinator', img: 'https://wiki.factorio.com/images/thumb/Decider_combinator.png/32px-Decider_combinator.png', }, { name: 'selector-combinator', img: 'https://wiki.factorio.com/images/thumb/Selector_combinator.png/32px-Selector_combinator.png', }, { name: 'constant-combinator', img: 'https://wiki.factorio.com/images/thumb/Constant_combinator.png/32px-Constant_combinator.png', }, { name: 'power-switch', img: 'https://wiki.factorio.com/images/thumb/Power_switch.png/32px-Power_switch.png', }, { name: 'programmable-speaker', img: 'https://wiki.factorio.com/images/thumb/Programmable_speaker.png/32px-Programmable_speaker.png', }, { name: 'display-panel', img: 'https://wiki.factorio.com/images/thumb/Display_panel.png/32px-Display_panel.png', }, { name: 'stone-brick', img: 'https://wiki.factorio.com/images/thumb/Stone_brick.png/32px-Stone_brick.png', }, { name: 'concrete', img: 'https://wiki.factorio.com/images/thumb/Concrete.png/32px-Concrete.png', }, { name: 'refined-concrete', img: 'https://wiki.factorio.com/images/thumb/Refined_concrete.png/32px-Refined_concrete.png', }, { name: 'hazard-concrete', img: 'https://wiki.factorio.com/images/thumb/Hazard_concrete.png/32px-Hazard_concrete.png', }, { name: 'refined-hazard-concrete', img: 'https://wiki.factorio.com/images/thumb/Refined_hazard_concrete.png/32px-Refined_hazard_concrete.png', }, { name: 'landfill', img: 'https://wiki.factorio.com/images/thumb/Landfill.png/32px-Landfill.png', }, { name: 'artificial-yumako-soil', img: 'https://wiki.factorio.com/images/thumb/Artificial_yumako_soil.png/32px-Artificial_yumako_soil.png', }, { name: 'overgrowth-yumako-soil', img: 'https://wiki.factorio.com/images/thumb/Overgrowth_yumako_soil.png/32px-Overgrowth_yumako_soil.png', }, { name: 'artificial-jellynut-soil', img: 'https://wiki.factorio.com/images/thumb/Artificial_jellynut_soil.png/32px-Artificial_jellynut_soil.png', }, { name: 'overgrowth-jellynut-soil', img: 'https://wiki.factorio.com/images/thumb/Overgrowth_jellynut_soil.png/32px-Overgrowth_jellynut_soil.png', }, { name: 'ice-platform', img: 'https://wiki.factorio.com/images/thumb/Ice_platform.png/32px-Ice_platform.png', }, { name: 'foundation', img: 'https://wiki.factorio.com/images/thumb/Foundation.png/32px-Foundation.png', }, { name: 'cliff-explosives', img: 'https://wiki.factorio.com/images/thumb/Cliff_explosives.png/32px-Cliff_explosives.png', }, { name: 'repair-pack', img: 'https://wiki.factorio.com/images/thumb/Repair_pack.png/32px-Repair_pack.png', }, { name: 'boiler', img: 'https://wiki.factorio.com/images/thumb/Boiler.png/32px-Boiler.png', }, { name: 'steam-engine', img: 'https://wiki.factorio.com/images/thumb/Steam_engine.png/32px-Steam_engine.png', }, { name: 'solar-panel', img: 'https://wiki.factorio.com/images/thumb/Solar_panel.png/32px-Solar_panel.png', }, { name: 'accumulator', img: 'https://wiki.factorio.com/images/thumb/Accumulator.png/32px-Accumulator.png', }, { name: 'nuclear-reactor', img: 'https://wiki.factorio.com/images/thumb/Nuclear_reactor.png/32px-Nuclear_reactor.png', }, { name: 'heat-pipe', img: 'https://wiki.factorio.com/images/thumb/Heat_pipe.png/32px-Heat_pipe.png', }, { name: 'heat-exchanger', img: 'https://wiki.factorio.com/images/thumb/Heat_exchanger.png/32px-Heat_exchanger.png', }, { name: 'steam-turbine', img: 'https://wiki.factorio.com/images/thumb/Steam_turbine.png/32px-Steam_turbine.png', },{ name: 'fusion-reactor', img: 'https://wiki.factorio.com/images/thumb/Fusion_reactor.png/32px-Fusion_reactor.png', }, { name: 'fusion-generator', img: 'https://wiki.factorio.com/images/thumb/Fusion_generator.png/32px-Fusion_generator.png', }, { name: 'burner-mining-drill', img: 'https://wiki.factorio.com/images/thumb/Burner_mining_drill.png/32px-Burner_mining_drill.png', }, { name: 'electric-mining-drill', img: 'https://wiki.factorio.com/images/thumb/Electric_mining_drill.png/32px-Electric_mining_drill.png', }, { name: 'big-mining-drill', img: 'https://wiki.factorio.com/images/thumb/Big_mining_drill.png/32px-Big_mining_drill.png', }, { name: 'offshore-pump', img: 'https://wiki.factorio.com/images/thumb/Offshore_pump.png/32px-Offshore_pump.png', }, { name: 'pumpjack', img: 'https://wiki.factorio.com/images/thumb/Pumpjack.png/32px-Pumpjack.png', }, { name: 'stone-furnace', img: 'https://wiki.factorio.com/images/thumb/Stone_furnace.png/32px-Stone_furnace.png', }, { name: 'steel-furnace', img: 'https://wiki.factorio.com/images/thumb/Steel_furnace.png/32px-Steel_furnace.png', }, { name: 'electric-furnace', img: 'https://wiki.factorio.com/images/thumb/Electric_furnace.png/32px-Electric_furnace.png', }, { name: 'foundry', img: 'https://wiki.factorio.com/images/thumb/Foundry.png/32px-Foundry.png', }, { name: 'recycler', img: 'https://wiki.factorio.com/images/thumb/Recycler.png/32px-Recycler.png', }, { name: 'agricultural-tower', img: 'https://wiki.factorio.com/images/thumb/Agricultural_tower.png/32px-Agricultural_tower.png', }, { name: 'biochamber', img: 'https://wiki.factorio.com/images/thumb/Biochamber.png/32px-Biochamber.png', }, { name: 'captive-biter-spawner', img: 'https://wiki.factorio.com/images/thumb/Captive_biter_spawner.png/32px-Captive_biter_spawner.png', }, { name: 'assembling-machine-1', img: 'https://wiki.factorio.com/images/thumb/Assembling_machine_1.png/32px-Assembling_machine_1.png', }, { name: 'assembling-machine-2', img: 'https://wiki.factorio.com/images/thumb/Assembling_machine_2.png/32px-Assembling_machine_2.png', }, { name: 'assembling-machine-3', img: 'https://wiki.factorio.com/images/thumb/Assembling_machine_3.png/32px-Assembling_machine_3.png', }, { name: 'oil-refinery', img: 'https://wiki.factorio.com/images/thumb/Oil_refinery.png/32px-Oil_refinery.png', }, { name: 'chemical-plant', img: 'https://wiki.factorio.com/images/thumb/Chemical_plant.png/32px-Chemical_plant.png', }, { name: 'centrifuge', img: 'https://wiki.factorio.com/images/thumb/Centrifuge.png/32px-Centrifuge.png', }, { name: 'electromagnetic-plant', img: 'https://wiki.factorio.com/images/thumb/Electromagnetic_plant.png/32px-Electromagnetic_plant.png', }, { name: 'cryogenic-plant', img: 'https://wiki.factorio.com/images/thumb/Cryogenic_plant.png/32px-Cryogenic_plant.png', }, { name: 'lab', img: 'https://wiki.factorio.com/images/thumb/Lab.png/32px-Lab.png', }, { name: 'biolab', img: 'https://wiki.factorio.com/images/thumb/Biolab.png/32px-Biolab.png', }, { name: 'lightning-rod', img: 'https://wiki.factorio.com/images/thumb/Lightning_rod.png/32px-Lightning_rod.png', }, { name: 'lightning-collector', img: 'https://wiki.factorio.com/images/thumb/Lightning_collector.png/32px-Lightning_collector.png', }, { name: 'heating-tower', img: 'https://wiki.factorio.com/images/thumb/Heating_tower.png/32px-Heating_tower.png', }, { name: 'beacon', img: 'https://wiki.factorio.com/images/thumb/Beacon.png/32px-Beacon.png', }, { name: 'speed-module', img: 'https://wiki.factorio.com/images/thumb/Speed_module.png/32px-Speed_module.png', }, { name: 'speed-module-2', img: 'https://wiki.factorio.com/images/thumb/Speed_module_2.png/32px-Speed_module_2.png', }, { name: 'speed-module-3', img: 'https://wiki.factorio.com/images/thumb/Speed_module_3.png/32px-Speed_module_3.png', }, { name: 'productivity-module', img: 'https://wiki.factorio.com/images/thumb/Productivity_module.png/32px-Productivity_module.png', }, { name: 'productivity-module-2', img: 'https://wiki.factorio.com/images/thumb/Productivity_module_2.png/32px-Productivity_module_2.png', }, { name: 'productivity-module-3', img: 'https://wiki.factorio.com/images/thumb/Productivity_module_3.png/32px-Productivity_module_3.png', }, { name: 'efficiency-module', img: 'https://wiki.factorio.com/images/thumb/Efficiency_module.png/32px-Efficiency_module.png', }, { name: 'efficiency-module-2', img: 'https://wiki.factorio.com/images/thumb/Efficiency_module_2.png/32px-Efficiency_module_2.png', }, { name: 'efficiency-module-3', img: 'https://wiki.factorio.com/images/thumb/Efficiency_module_3.png/32px-Efficiency_module_3.png', }, { name: 'quality-module', img: 'https://wiki.factorio.com/images/thumb/Quality_module.png/32px-Quality_module.png', },{ name: 'cargo-landing-pad', img: 'https://wiki.factorio.com/images/thumb/Cargo_landing_pad.png/32px-Cargo_landing_pad.png', }, { name: 'space-platform-foundation', img: 'https://wiki.factorio.com/images/thumb/Space_platform_foundation.png/32px-Space_platform_foundation.png', }, { name: 'cargo-bay', img: 'https://wiki.factorio.com/images/thumb/Cargo_bay.png/32px-Cargo_bay.png', }, { name: 'asteroid-collector', img: 'https://wiki.factorio.com/images/thumb/Asteroid_collector.png/32px-Asteroid_collector.png', }, { name: 'crusher', img: 'https://wiki.factorio.com/images/thumb/Crusher.png/32px-Crusher.png', }, { name: 'thruster', img: 'https://wiki.factorio.com/images/thumb/Thruster.png/32px-Thruster.png', }, { name: 'space-platform-starter-pack', img: 'https://wiki.factorio.com/images/thumb/Space_platform_hub.png/32px-Space_platform_hub.png', }, { name: 'satellite', img: 'https://wiki.factorio.com/images/thumb/Satellite.png/32px-Satellite.png', }, { name: 'metallic-asteroid-chunk', img: 'https://wiki.factorio.com/images/thumb/Metallic_asteroid_chunk.png/32px-Metallic_asteroid_chunk.png', }, { name: 'carbonic-asteroid-chunk', img: 'https://wiki.factorio.com/images/thumb/Carbonic_asteroid_chunk.png/32px-Carbonic_asteroid_chunk.png', }, { name: 'oxide-asteroid-chunk', img: 'https://wiki.factorio.com/images/thumb/Oxide_asteroid_chunk.png/32px-Oxide_asteroid_chunk.png', }, { name: 'promethium-asteroid-chunk', img: 'https://wiki.factorio.com/images/thumb/Promethium_asteroid_chunk.png/32px-Promethium_asteroid_chunk.png', }, { name: 'submachine-gun', img: 'https://wiki.factorio.com/images/thumb/Submachine_gun.png/32px-Submachine_gun.png', }, { name: 'railgun', img: 'https://wiki.factorio.com/images/thumb/Railgun.png/32px-Railgun.png', }, { name: 'teslagun', img: 'https://wiki.factorio.com/images/thumb/Tesla_gun.png/32px-Tesla_gun.png', }, { name: 'shotgun', img: 'https://wiki.factorio.com/images/thumb/Shotgun.png/32px-Shotgun.png', }, { name: 'combat-shotgun', img: 'https://wiki.factorio.com/images/thumb/Combat_shotgun.png/32px-Combat_shotgun.png', }, { name: 'rocket-launcher', img: 'https://wiki.factorio.com/images/thumb/Rocket_launcher.png/32px-Rocket_launcher.png', }, { name: 'flamethrower', img: 'https://wiki.factorio.com/images/thumb/Flamethrower.png/32px-Flamethrower.png', }, { name: 'firearm-magazine', img: 'https://wiki.factorio.com/images/thumb/Firearm_magazine.png/32px-Firearm_magazine.png', }, { name: 'piercing-rounds-magazine', img: 'https://wiki.factorio.com/images/thumb/Piercing_rounds_magazine.png/32px-Piercing_rounds_magazine.png', }, { name: 'uranium-rounds-magazine', img: 'https://wiki.factorio.com/images/thumb/Uranium_rounds_magazine.png/32px-Uranium_rounds_magazine.png', }, { name: 'shotgun-shell', img: 'https://wiki.factorio.com/images/thumb/Shotgun_shells.png/32px-Shotgun_shells.png', }, { name: 'piercing-shotgun-shell', img: 'https://wiki.factorio.com/images/thumb/Piercing_shotgun_shells.png/32px-Piercing_shotgun_shells.png', }, { name: 'cannon-shell', img: 'https://wiki.factorio.com/images/thumb/Cannon_shell.png/32px-Cannon_shell.png', }, { name: 'explosive-cannon-shell', img: 'https://wiki.factorio.com/images/thumb/Explosive_cannon_shell.png/32px-Explosive_cannon_shell.png', }, { name: 'uranium-cannon-shell', img: 'https://wiki.factorio.com/images/thumb/Uranium_cannon_shell.png/32px-Uranium_cannon_shell.png', }, { name: 'explosive-uranium-cannon-shell', img: 'https://wiki.factorio.com/images/thumb/Explosive_uranium_cannon_shell.png/32px-Explosive_uranium_cannon_shell.png', }, { name: 'artillery-shell', img: 'https://wiki.factorio.com/images/thumb/Artillery_shell.png/32px-Artillery_shell.png', }, { name: 'rocket', img: 'https://wiki.factorio.com/images/thumb/Rocket.png/32px-Rocket.png', }, { name: 'explosive-rocket', img: 'https://wiki.factorio.com/images/thumb/Explosive_rocket.png/32px-Explosive_rocket.png', }, { name: 'atomic-bomb', img: 'https://wiki.factorio.com/images/thumb/Atomic_bomb.png/32px-Atomic_bomb.png', }, { name: 'capture-robot-rocket', img: 'https://wiki.factorio.com/images/thumb/Capture_bot_rocket.png/32px-Capture_bot_rocket.png', }, { name: 'railgun-ammo', img: 'https://wiki.factorio.com/images/thumb/Railgun_ammo.png/32px-Railgun_ammo.png', }, { name: 'flamethrower-ammo', img: 'https://wiki.factorio.com/images/thumb/Flamethrower_ammo.png/32px-Flamethrower_ammo.png', }, { name: 'tesla-ammo', img: 'https://wiki.factorio.com/images/thumb/Tesla_ammo.png/32px-Tesla_ammo.png', }, { name: 'grenade', img: 'https://wiki.factorio.com/images/thumb/Grenade.png/32px-Grenade.png', }, { name: 'cluster-grenade', img: 'https://wiki.factorio.com/images/thumb/Cluster_grenade.png/32px-Cluster_grenade.png', }, { name: 'poison-capsule', img: 'https://wiki.factorio.com/images/thumb/Poison_capsule.png/32px-Poison_capsule.png', }, { name: 'slowdown-capsule', img: 'https://wiki.factorio.com/images/thumb/Slowdown_capsule.png/32px-Slowdown_capsule.png', }, { name: 'defender-capsule', img: 'https://wiki.factorio.com/images/thumb/Defender_capsule.png/32px-Defender_capsule.png', }, { name: 'distractor-capsule', img: 'https://wiki.factorio.com/images/thumb/Distractor_capsule.png/32px-Distractor_capsule.png', }, { name: 'destroyer-capsule', img: 'https://wiki.factorio.com/images/thumb/Destroyer_capsule.png/32px-Destroyer_capsule.png', }, { name: 'light-armor', img: 'https://wiki.factorio.com/images/thumb/Light_armor.png/32px-Light_armor.png', }, { name: 'heavy-armor', img: 'https://wiki.factorio.com/images/thumb/Heavy_armor.png/32px-Heavy_armor.png', }, { name: 'modular-armor', img: 'https://wiki.factorio.com/images/thumb/Modular_armor.png/32px-Modular_armor.png', }, { name: 'power-armor', img: 'https://wiki.factorio.com/images/thumb/Power_armor.png/32px-Power_armor.png', }, { name: 'power-armor-mk2', img: 'https://wiki.factorio.com/images/thumb/Power_armor_MK2.png/32px-Power_armor_MK2.png', }, { name: 'mech-armor', img: 'https://wiki.factorio.com/images/thumb/Mech_armor.png/32px-Mech_armor.png', }, { name: 'solar-panel-equipment', img: 'https://wiki.factorio.com/images/thumb/Portable_solar_panel.png/32px-Portable_solar_panel.png', }, { name: 'fission-reactor-equipment', img: 'https://wiki.factorio.com/images/thumb/Portable_fission_reactor.png/32px-Portable_fission_reactor.png', }, { name: 'fusion-reactor-equipment', img: 'https://wiki.factorio.com/images/thumb/Portable_fusion_reactor.png/32px-Portable_fusion_reactor.png', }, { name: 'battery-equipment', img: 'https://wiki.factorio.com/images/thumb/Personal_battery.png/32px-Personal_battery.png', }, { name: 'battery-mk2-equipment', img: 'https://wiki.factorio.com/images/thumb/Personal_battery_MK2.png/32px-Personal_battery_MK2.png', }, { name: 'battery-mk3-equipment', img: 'https://wiki.factorio.com/images/thumb/Personal_battery_MK3.png/32px-Personal_battery_MK3.png', }, { name: 'belt-immunity-equipment', img: 'https://wiki.factorio.com/images/thumb/Belt_immunity_equipment.png/32px-Belt_immunity_equipment.png', }, { name: 'exoskeleton-equipment', img: 'https://wiki.factorio.com/images/thumb/Exoskeleton.png/32px-Exoskeleton.png', }, { name: 'personal-roboport-equipment', img: 'https://wiki.factorio.com/images/thumb/Personal_roboport.png/32px-Personal_roboport.png', }, { name: 'personal-roboport-mk2-equipment', img: 'https://wiki.factorio.com/images/thumb/Personal_roboport_MK2.png/32px-Personal_roboport_MK2.png', }, { name: 'night-vision-equipment', img: 'https://wiki.factorio.com/images/thumb/Nightvision.png/32px-Nightvision.png', }, { name: 'toolbelt-equipment', img: 'https://wiki.factorio.com/images/thumb/Toolbelt_equipment.png/32px-Toolbelt_equipment.png', }, { name: 'energy-shield-equipment', img: 'https://wiki.factorio.com/images/thumb/Energy_shield.png/32px-Energy_shield.png', }, { name: 'energy-shield-mk2-equipment', img: 'https://wiki.factorio.com/images/thumb/Energy_shield_MK2.png/32px-Energy_shield_MK2.png', }, { name: 'personal-laser-defense-equipment', img: 'https://wiki.factorio.com/images/thumb/Personal_laser_defense.png/32px-Personal_laser_defense.png', }, { name: 'discharge-defense-equipment', img: 'https://wiki.factorio.com/images/thumb/Discharge_defense.png/32px-Discharge_defense.png', }, { name: 'stone-wall', img: 'https://wiki.factorio.com/images/thumb/Wall.png/32px-Wall.png', }, { name: 'gate', img: 'https://wiki.factorio.com/images/thumb/Gate.png/32px-Gate.png', }, { name: 'radar', img: 'https://wiki.factorio.com/images/thumb/Radar.png/32px-Radar.png', }, { name: 'land-mine', img: 'https://wiki.factorio.com/images/thumb/Land_mine.png/32px-Land_mine.png', }, { name: 'gun-turret', img: 'https://wiki.factorio.com/images/thumb/Gun_turret.png/32px-Gun_turret.png', }, { name: 'laser-turret', img: 'https://wiki.factorio.com/images/thumb/Laser_turret.png/32px-Laser_turret.png', }, { name: 'flamethrower-turret', img: 'https://wiki.factorio.com/images/thumb/Flamethrower_turret.png/32px-Flamethrower_turret.png', }, { name: 'artillery-turret', img: 'https://wiki.factorio.com/images/thumb/Artillery_turret.png/32px-Artillery_turret.png', }, { name: 'rocket-turret', img: 'https://wiki.factorio.com/images/thumb/Rocket_turret.png/32px-Rocket_turret.png', }, { name: 'tesla-turret', img: 'https://wiki.factorio.com/images/thumb/Tesla_turret.png/32px-Tesla_turret.png', }, { name: 'railgun-turret', img: 'https://wiki.factorio.com/images/thumb/Railgun_turret.png/32px-Railgun_turret.png', }
];

// --- Utility Functions ---
function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
  document.querySelector(`.tab[onclick*="'${tabId}'"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function copyToClipboard(elementId, event) {
  const field = document.getElementById(elementId);
  if (!field.value) return;
  field.select();
  navigator.clipboard.writeText(field.value).then(() => {
      const button = event.target;
      const originalText = button.textContent;
      button.textContent = 'Скопировано!';
      setTimeout(() => { button.textContent = originalText; }, 1500);
  });
}

// --- Blueprint Tab Functions ---
function decodeBlueprint() {
  try {
    const blueprintInput = document.getElementById('blueprintInput');
    const blueprint = blueprintInput.value.trim();
    if (!blueprint) return alert('Пожалуйста, введите строку чертежа');
    addToHistory(blueprint);
    const base64 = blueprint.slice(1);
    const byteArray = base64ToUint8Array(base64);
    const jsonString = pako.inflate(byteArray, { to: 'string' });
    const json = JSON.parse(jsonString);
    jsonEditor.setValue(JSON.stringify(json, null, 2));
    encodeBlueprintPreview(json);
  } catch (e) {
    alert('Случилась ошибка: ' + e.message);
  }
}

function encodeBlueprintPreview(json) {
  try {
    const jsonString = JSON.stringify(json);
    const compressed = pako.deflate(jsonString);
    const base64 = btoa(String.fromCharCode.apply(null, compressed));
    document.getElementById('encodedOutput').value = '0' + base64;
  } catch (e) {
    document.getElementById('encodedOutput').value = 'Ошибка кодирования: ' + e.message;
  }
}

function encodeJson() {
  try {
    const json = JSON.parse(jsonEditor.getValue());
    encodeBlueprintPreview(json);
  } catch (e) {
    alert('Ошибка перекодирования: ' + e.message);
  }
}

function clearBlueprint() {
  document.getElementById('blueprintInput').value = '';
}

// --- History Functions ---
function addToHistory(blueprint) {
  if (!blueprint || blueprintHistory.includes(blueprint)) return;
  blueprintHistory.unshift(blueprint);
  if (blueprintHistory.length > MAX_HISTORY_ITEMS) blueprintHistory.pop();
  updateHistoryDisplay();
  localStorage.setItem('blueprintHistory', JSON.stringify(blueprintHistory));
}

function updateHistoryDisplay() {
  const container = document.getElementById('historyItems');
  container.innerHTML = '';
  blueprintHistory.forEach((bp, index) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = bp.substring(0, 10) + '...';
    item.title = `Восстановить чертеж #${index + 1}`;
    item.onclick = () => restoreFromHistory(bp);
    container.appendChild(item);
  });
}

function clearHistory() {
  blueprintHistory = [];
  localStorage.removeItem('blueprintHistory');
  updateHistoryDisplay();
}

function restoreFromHistory(blueprint) {
  document.getElementById('blueprintInput').value = blueprint;
  decodeBlueprint();
}

function loadHistory() {
  const saved = localStorage.getItem('blueprintHistory');
  if (saved) {
    blueprintHistory = JSON.parse(saved);
    updateHistoryDisplay();
  }
}

// --- Search/Replace Functions ---
function searchInJson() {
  jsonEditor.getAllMarks().forEach(mark => mark.clear());
  const searchTerm = document.getElementById('searchInput').value.trim();
  if (!searchTerm) { searchCursor = null; return; }
  searchCursor = jsonEditor.getSearchCursor(searchTerm, {line: 0, ch: 0}, {caseFold: true});
  findNext();
}

function findNext() {
  if (!searchCursor) return;
  if (!searchCursor.findNext()) {
    searchCursor = jsonEditor.getSearchCursor(searchCursor.query, {line: 0, ch: 0}, {caseFold: true});
    if (!searchCursor.findNext()) return alert('Совпадений не найдено!');
  }
  jsonEditor.setSelection(searchCursor.from(), searchCursor.to());
}

function findPrev() {
  if (!searchCursor) return;
  if (!searchCursor.findPrevious()) {
    const lastLine = jsonEditor.lastLine();
    searchCursor = jsonEditor.getSearchCursor(searchCursor.query, {line: lastLine, ch: jsonEditor.getLine(lastLine).length}, {caseFold: true});
    if (!searchCursor.findPrevious()) return alert('Совпадений не найдено!');
  }
  jsonEditor.setSelection(searchCursor.from(), searchCursor.to());
}

function toggleReplaceUI() {
  const container = document.getElementById('replaceContainer');
  container.style.display = container.style.display === 'block' ? 'none' : 'block';
}

function replaceAll() {
  const findText = document.getElementById('replaceInput').value;
  if (!findText) return alert('Введите текст для замены.');
  const replaceWithText = document.getElementById('replaceWithInput').value;
  const currentCode = jsonEditor.getValue();
  const newCode = currentCode.replace(new RegExp(findText, 'g'), replaceWithText);
  if (currentCode !== newCode) {
    jsonEditor.setValue(newCode);
    alert('Замена завершена!');
  } else {
    alert('Текст для замены не найден.');
  }
}

// --- Book Tab Functions ---
function populateIconSelectors() {
  let html = '';
  for (let i = 1; i <= 4; i++) {
    html += `<div class='iconRow'>
      <div class='customSelect' data-index='${i}' onclick='toggleOptions(this)'>
        <img src='${iconsList[0].img}' id='selectedImg${i}'><span id='selectedName${i}'>Не выбрано</span>
      </div>
      <div class='optionsList'>${iconsList.map(icon => 
        `<div class='optionItem' onclick='selectIcon(${i}, "${icon.name}", "${icon.img}")'><img src='${icon.img}'><span>${icon.name || 'Пусто'}</span></div>`
      ).join('')}</div>
      <img class='iconPreview' id='preview${i}' src=''/>
    </div>`;
  }
  document.getElementById('iconSelectors').innerHTML = html;
}

function toggleOptions(selectDiv) {
  let list = selectDiv.nextElementSibling;
  list.style.display = list.style.display === 'block' ? 'none' : 'block';
}

function selectIcon(index, name, img) {
  document.getElementById('selectedImg' + index).src = img;
  document.getElementById('selectedName' + index).innerText = name || 'Не выбрано';
  document.getElementById('preview' + index).src = img;
  updateBookJsonWithMetadata();
  document.querySelectorAll('.optionsList').forEach(list => list.style.display = 'none');
}

function decodeBook() {
  try {
    const base64 = document.getElementById('bookInput').value.slice(1);
    const byteArray = base64ToUint8Array(base64);
    const jsonString = pako.inflate(byteArray, { to: 'string' });
    const json = JSON.parse(jsonString);
    document.getElementById('bookDecoded').value = JSON.stringify(json, null, 2);
    updateBookMetaFields(json);
  } catch (e) {
    alert('Случилась ошибка: ' + e.message);
  }
}

function updateBookMetaFields(json) {
  const book = json.blueprint_book;
  document.getElementById('bookLabel').value = book.label || '';
  document.getElementById('bookDescription').value = book.description || '';
  updateCounters();
}

function updateBookJsonWithMetadata() {
  try {
    let jsonStr = document.getElementById('bookDecoded').value;
    if (!jsonStr) return;
    let json = JSON.parse(jsonStr);
    let book = json.blueprint_book;
    book.label = document.getElementById('bookLabel').value;
    book.description = document.getElementById('bookDescription').value;
    book.icons = [];
    for (let i = 1; i <= 4; i++) {
      let name = document.getElementById('selectedName' + i).innerText;
      if (name && name !== 'Не выбрано') {
        let needsEntityType = iconsList.find(icon => icon.name === name)?.needsEntityType;
        let iconObj = { signal: { name: name }, index: i };
        if (needsEntityType) { iconObj.signal.type = "entity"; }
        book.icons.push(iconObj);
      }
    }
    document.getElementById('bookDecoded').value = JSON.stringify(json, null, 2);
  } catch (e) { console.error("Could not update book JSON: " + e); }
}

function updateCounters() {
  let labelLen = document.getElementById('bookLabel').value.length;
  let descLen = document.getElementById('bookDescription').value.length;
  document.getElementById('labelCounter').innerText = `${labelLen}/199`;
  document.getElementById('descCounter').innerText = `${descLen}/499`;
}

function reencodeBookJson() {
  try {
    updateBookJsonWithMetadata(); // Ensure metadata is current before encoding
    let json = JSON.parse(document.getElementById('bookDecoded').value);
    const jsonString = JSON.stringify(json);
    const compressed = pako.deflate(jsonString);
    const base64 = btoa(String.fromCharCode.apply(null, compressed));
    document.getElementById('bookEncoded').value = '0' + base64;
  } catch (e) {
    alert('Ошибка кодирования книги: ' + e.message);
  }
}

function clearBookInput() {
  document.getElementById('bookInput').value = '';
  document.getElementById('bookDecoded').value = '';
  document.getElementById('bookEncoded').value = '';
  document.getElementById('bookLabel').value = '';
  document.getElementById('bookDescription').value = '';
  updateCounters();
}

// --- Page Initialization ---
window.onload = function() {
  jsonEditor = CodeMirror(document.getElementById('jsonEditorContainer'), {
      mode: { name: "javascript", json: true },
      theme: "material-darker",
      lineNumbers: true,
      lineWrapping: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      highlightSelectionMatches: { showToken: /\w/ }
  });
  
  loadHistory();
  decodeBlueprint();
  populateIconSelectors();
  
  document.getElementById('searchInput').addEventListener('keypress', e => { if (e.key === 'Enter') searchInJson(); });
  document.getElementById('bookLabel').addEventListener('input', () => { updateBookJsonWithMetadata(); updateCounters(); });
  document.getElementById('bookDescription').addEventListener('input', () => { updateBookJsonWithMetadata(); updateCounters(); });
};
