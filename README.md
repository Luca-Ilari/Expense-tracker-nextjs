# Expense-tracker-nextjs

This is a simple project made with next-js and supabase that keep track of your expenses.
It's still in development and has some bugs but I'm working on it :thumbsup:

Main Page after login 
![GuiWallets](https://user-images.githubusercontent.com/54724171/231968386-08fdf0cc-91e8-417e-8a80-bd7d927abda6.png)

## To use this project
1. Run ```npm install``` in the project directory
2. Create the file lib/supabase.js and add the following code replacing SUPABASE_URL and ANON_KEY with your own supabase db.
```
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient('replace_with_SUPABASE_URL', 'replace_with_ANON_KEY')
```
3. You can find how the database is designed [here](https://github.com/Luca-Ilari/Expense-tracker-nextjs/blob/main/Db.png)
