package com.ooad.inventorymgmt.aws;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity,String> {

	List<InvoiceEntity> findAllByOrderByDueDate();

	Collection<? extends InvoiceEntity> findByInvoiceIdIgnoreCase(String invoiceId);

	Collection<? extends InvoiceEntity> findByCustomerNameIgnoreCaseContaining(String customerName);

	Collection<? extends InvoiceEntity> findByCustomerEmailIgnoreCase(String customerEmail);

	List<InvoiceEntity> findByInvoiceId(String invoiceId);
	
	@Modifying
	@Query("UPDATE InvoiceEntity i SET i.amountDue = :amountDue, i.amountPaid = :amountPaid WHERE i.id = :invoiceId")
	void updateInvoiceAmounts(@Param("invoiceId") String invoiceId, @Param("amountDue") int amountDue, @Param("amountPaid") int amountPaid);


	
	

}
