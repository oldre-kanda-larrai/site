export const up = async (knex) => {
    return knex.raw(`
        ALTER TABLE stores ADD COLUMN link VARCHAR(100) NOT NULL
        CONSTRAINT uq_stores_link UNIQUE;
        
        ALTER TABLE product_options ADD COLUMN product_option_id uuid
          CONSTRAINT fk_product_options_parent
          REFERENCES product_options(id);
          
  `);
};

export const down = async (knex) => {
  return knex.raw(`
      ALTER TABLE stores DROP COLUMN link;
      ALTER TABLE product_options DROP COLUMN product_option_id;
  `);

};