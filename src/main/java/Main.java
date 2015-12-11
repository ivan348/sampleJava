import org.springframework.context.support.GenericXmlApplicationContext;

import com.artsisheuski.expenses.model.ExpenseDao;

public class Main {

	public static void main(String[] args) {
		GenericXmlApplicationContext ctx = new GenericXmlApplicationContext();
		ctx.load("classpath:config.xml");
		ctx.refresh();
		ExpenseDao dao = (ExpenseDao) ctx.getBean("expenseDao");
		System.out.println(dao.getExpenses());

	}

}
