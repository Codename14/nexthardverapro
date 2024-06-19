// import type { Database as DB } from '@/lib/database.types';

declare global {
    type Database = DB; /* így nem kell meghívni */
    //     type Food = DB['public']['Tables']['foods']['Row'];
    //     type FoodCategory = DB['public']['Tables']['food_categories']['Row'];
    //     type Post = DB['public']['Tables']['posts']['Row'];
    //     type Prices = DB['public']['Tables']['foods']['Row'];
    //     type PublicOrders = DB['public']['Tables']['public_orders']['Row'];
    //     type UserRole = DB['public']['Tables']['users_role']['Row'];
    //     type UserData = DB['public']['Tables']['user_data']['Row'];
    //     type ManualOpening = DB['public']['Tables']['manual_opening']['Row'];
    //     type OpeningHours = DB['public']['Tables']['opening_hours']['Row'];
    //     type Toppings = DB['public']['Tables']['toppings']['Row'];
    //     type ToppingCategories = DB['public']['Tables']['topping_categories']['Row'];
    //     type ToppingCategoriesConnect = DB['public']['Tables']['toppings_food_connect']['Row'];
    //     type searchParamType = { [key: string]: string | string[] | undefined } /* nextjs searchParam type from documentation */
}
type SearchParamsType = {
    query: string;
    categoryID: string;
};
