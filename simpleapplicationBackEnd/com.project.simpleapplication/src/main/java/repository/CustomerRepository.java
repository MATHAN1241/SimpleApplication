package repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import entity.Customer;


public interface CustomerRepository extends JpaRepository<Customer, Long>{

	Optional<Customer> findByEmailIDAndPassword(String emailID,String password);
	Optional<Customer> findByEmailID(String emailID);
}