package com.artsisheuski.expenses.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name="expenses")
@NamedQueries({
		@NamedQuery(name = "Expense.SelectAll", query = "select distinct e from Expense e left join fetch e.user u"),
		@NamedQuery(name = "Expense.SelectById", query = "from Expense e where e.id=:id"),
		@NamedQuery(name = "Expenses.SelectByCurrency", query = "from Expense e where e.currency=:currency")
})
public class Expense {
	private Long id;
	private String name;
	private Float value;
	private String type;
	private String currency;
	private String category;
	private User user;

	@Id
	@GeneratedValue
	@Column(name="id")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name="name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name="value")
	public Float getValue() {
		return value;
	}

	public void setValue(Float value) {
		this.value = value;
	}

	@Column(name="type")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name="currency")
	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	@Column(name="category")
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Expense [id=" + id + ", name=" + name + ", value=" + value + ", type=" + type + ", currency=" + currency
				+ ", category=" + category + "]";
	}

}
