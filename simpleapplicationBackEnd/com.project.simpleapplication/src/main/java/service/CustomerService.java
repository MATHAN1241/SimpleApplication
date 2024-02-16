package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import entity.Customer;
import exception.ResourceNotFound;
import repository.CustomerRepository;


@Service
public class CustomerService implements CustomerServiceif {
	@Autowired
	private CustomerRepository customerRepository;

	public CustomerService(CustomerRepository customerRepository) {
		super();
		this.customerRepository = customerRepository;
	}

	
	public Customer getCustomerById(long customerId) {

		return customerRepository.findById(customerId)
				.orElseThrow(() -> new ResourceNotFound("Customer", "Id", customerId));
	}

	
	public Customer saveCustomer(Customer customer) {

		return customerRepository.save(customer);
	}

	
	public Customer loginCustomer(Customer customer) {

		return this.customerRepository.findByEmailIDAndPassword(customer.emailID, customer.password).orElseThrow(
				() -> new ResourceNotFound("Customer ", "Id", customer.emailID + " and password " + customer.password));
	}

	public Customer getCustomerByEmail(Customer customer) {
		return this.customerRepository.findByEmailID(customer.emailID)
				.orElseThrow(() -> new ResourceNotFound("Customer ", "Email", customer.emailID));
	}

	public Customer updateCustomer(Customer customer, long customerId) {

		Customer existingCustomer = customerRepository.findById(customerId)
				.orElseThrow(() -> new ResourceNotFound("Customer", "Id", customerId));
		existingCustomer.setFirstName(customer.getFirstName());
		existingCustomer.setLastName(customer.getLastName());
		existingCustomer.setPhoneNumber(customer.getPhoneNumber());
		existingCustomer.setEmailID(customer.getEmailID());
		existingCustomer.setPassword(customer.getPassword());
		existingCustomer.setAddress(customer.getAddress());
		existingCustomer.setZipCode(customer.getZipCode());
		customerRepository.save(existingCustomer);
		return existingCustomer;
	}

	
	public List<Customer> getAllCustomers() {

		return customerRepository.findAll();
	}

	
	public void deleteCustomer(long customerId) {
		customerRepository.findById(customerId).orElseThrow(()->new ResourceNotFound("Customer","Id",customerId));
		customerRepository.deleteById(customerId);
		
}
}